export const getRedisConfig = () => ({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_HOST_PORT,
  password: process.env.REDIS_PASSWORD,
});
