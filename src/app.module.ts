import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './location/location.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { IdToBodyInterceptor } from './interceptor/id-to-body-interceptor';
import { LoggerModule } from 'nestjs-pino';
import { loggerOptions } from './config/logger.config';
import { ConfigModule } from '@nestjs/config';
import { getTypeOrmConfig } from './config/type-orm.config';

@Module({
  imports: [
    LoggerModule.forRoot(loggerOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
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
