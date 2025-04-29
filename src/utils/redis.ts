import Redis from 'ioredis';

// Initialize Redis client
const redis = new Redis(import.meta.env.REDIS_URI);

// set redis cache
export const setRedisCache = async (key: string, value: string, ttl?: number) => {
  if (!ttl) {
    await redis.set(key, value);
  } else {
    await redis.set(key, value, 'EX', ttl);
  }
};

// get redis cache
export const getRedisCache = async (key: string) => {
  return await redis.get(key);
};

// check redis cache
export const checkRedisCache = async (key: string) => {
  return await redis.exists(key);
};

// delete redis cache
export const delRedisCache = async (key: string) => {
  await redis.del(key);
};

// Error handling
redis.on('error', (error) => {
  console.error('Redis Error:', error);
});

export default redis; 