import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { IsNumberUniqueConstraint } from './dto/rules/is-number-unique-constraint';
import { RedisModule } from 'src/common/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), RedisModule],
  controllers: [LocationController],
  providers: [LocationService, IsNumberUniqueConstraint],
})
export class LocationModule {}
