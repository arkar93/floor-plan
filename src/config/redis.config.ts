export const getRedisConfig = () => ({
  host: '127.0.0.1',
  port: +process.env.REDIS_HOST_PORT,
  password: process.env.REDIS_PASSWORD,
});
