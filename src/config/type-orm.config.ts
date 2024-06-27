import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Location } from 'src/location/entities/location.entity';

export const getTypeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Location],
  synchronize: process.env.SYNCHRONIZE === 'true' ? true : false,
});
