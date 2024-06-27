import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './location/location.module';
import { Location } from './location/entities/location.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { IdToBodyInterceptor } from './interceptor/id-to-body-interceptor';
import { LoggerModule } from 'nestjs-pino';
import { loggerOptions } from './config/logger.config';

@Module({
  imports: [
    LoggerModule.forRoot(loggerOptions),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'secret',
      username: 'postgres',
      entities: [Location],
      database: 'floor-plan',
      synchronize: true,
      logging: true,
    }),
    LocationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: IdToBodyInterceptor,
    },
  ],
})
export class AppModule {}
