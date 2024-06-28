import { Module } from '@nestjs/common';
import Redis from 'ioredis';
import { getRedisConfig } from 'src/config/redis.config';

@Module({
  imports: [],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const redisConfig = getRedisConfig();
        return new Redis(redisConfig);
      },
      inject: [],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
