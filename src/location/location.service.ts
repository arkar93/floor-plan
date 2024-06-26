import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  create(body: CreateLocationDto) {
    const location: Location = this.locationRepository.create(body);
    return this.locationRepository.save(location);
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
      throw new Error('location not found');
    }
    return location;
  }

  async update(id: number, body: UpdateLocationDto) {
    const location = await this.findOne({ id });
    Object.assign(location, body);
    return this.locationRepository.save(location);
  }

  async remove(id: number) {
    const location = await this.locationRepository.findOneBy({ id });
    return this.locationRepository.remove(location);
  }
}
