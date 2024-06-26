import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import {
  FailedCreateLocationException,
  FailedDeleteLocationException,
  FailedUpdateLocationException,
  LocationNotFoundException,
} from 'src/location/common/general-exception';
import { QueryDto } from './dto/get-query-dto';
import { PAGINATION } from './common/interfaces';
import { ConditionType, SortType } from './common/enum';
import { Redis } from 'ioredis';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async create(body: CreateLocationDto) {
    try {
      const location: Location = this.locationRepository.create(body);
      const savedLocation = await this.locationRepository.save(location);
      this.removeRedisCache();
      return savedLocation;
    } catch (error) {
      throw new FailedCreateLocationException();
    }
  }

  async removeRedisCache() {
    const keys = await this.redisClient.keys('locations:*');
    if (keys.length > 0) {
      await this.redisClient.del(keys);
    }
  }

  async findAll(query: QueryDto) {
    const {
      page = 1,
      limit = 10,
      isPaginated = 'true',
      search,
      condition,
      sortBy,
      sort,
    } = query;
    const isPaginationEnabled = isPaginated !== 'false';

    const cacheKey = `locations:${JSON.stringify(query)}`;
    const cachedData = await this.redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response: PAGINATION = {
      results: [],
      total: 0,
      page: 1,
      totalPages: 1,
    };
    const queryBuilder = this.locationRepository.createQueryBuilder('location');

    if (search) {
      if (condition === ConditionType.EXACT) {
        queryBuilder.andWhere(
          'location.building = :search OR location.name = :search OR location.number = :search',
          { search },
        );
      } else if (condition === ConditionType.INCLUDE) {
        queryBuilder.andWhere(
          'location.building LIKE :search OR location.name LIKE :search OR location.number LIKE :search',
          { search: `%${search}%` },
        );
      }
    }

    if (sortBy && sort) {
      const order = sort === SortType.ASC ? 'ASC' : 'DESC';
      queryBuilder.orderBy(`location.${sortBy}`, order);
    } else {
      queryBuilder.orderBy('location.id', 'DESC');
    }

    if (isPaginationEnabled) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    const [results, total] = await queryBuilder.getManyAndCount();

    response.results = results;
    response.total = total;
    response.page = isPaginationEnabled ? page : 1;
    response.totalPages = isPaginationEnabled ? Math.ceil(total / limit) : 1;

    await this.redisClient.set(
      cacheKey,
      JSON.stringify(response),
      'EX',
      +process.env.REDIS_EXPIRY_MINUTES,
    ); // Cache with minutes

    return response;
  }

  async findByNumber(number: string): Promise<Location | undefined> {
    return this.locationRepository.findOne({ where: { number } });
  }

  async findOne(param) {
    const location = await this.locationRepository.findOneBy(param);
    if (!location) {
      throw new LocationNotFoundException();
    }
    return location;
  }

  async update(id: number, body: UpdateLocationDto) {
    try {
      const location = await this.findOne({ id });
      Object.assign(location, body);
      await this.locationRepository.save(location);
      await this.removeRedisCache();
    } catch (error) {
      throw new FailedUpdateLocationException();
    }
  }

  async remove(id: number) {
    try {
      const location = await this.locationRepository.findOneBy({ id });
      await this.locationRepository.remove(location);
      await this.removeRedisCache();
    } catch (error) {
      throw new FailedDeleteLocationException();
    }
  }
}
