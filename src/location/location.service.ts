import { Injectable } from '@nestjs/common';
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

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  create(body: CreateLocationDto) {
    try {
      const location: Location = this.locationRepository.create(body);
      return this.locationRepository.save(location);
    } catch (error) {
      throw new FailedCreateLocationException();
    }
  }

  findAll() {
    return this.locationRepository.find();
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
      return this.locationRepository.save(location);
    } catch (error) {
      throw new FailedUpdateLocationException();
    }
  }

  async remove(id: number) {
    try {
      const location = await this.locationRepository.findOneBy({ id });
      return this.locationRepository.remove(location);
    } catch (error) {
      throw new FailedDeleteLocationException();
    }
  }
}
