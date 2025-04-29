import Redis from 'ioredis';

// Initialize Redis client
const redis = new Redis(import.meta.env.REDIS_URI);

// OTP related functions
export const storeOTP = async (phoneNumber: string, otp: string) => {
  const key = `otp:${phoneNumber}`;
  await redis.set(key, otp, 'EX', 300); // 5 minutes expiration
};

export const getOTP = async (phoneNumber: string) => {
  const key = `otp:${phoneNumber}`;
  return await redis.get(key);
};

export const deleteOTP = async (phoneNumber: string) => {
  const key = `otp:${phoneNumber}`;
  await redis.del(key);
};

// Rate limiting functions
export const setResendCooldown = async (phoneNumber: string) => {
  const key = `cooldown:${phoneNumber}`;
  await redis.set(key, '1', 'EX', 30); // 30 seconds cooldown
};

export const checkResendCooldown = async (phoneNumber: string) => {
  const key = `cooldown:${phoneNumber}`;
  return await redis.exists(key);
};

// Error handling
redis.on('error', (error) => {
  console.error('Redis Error:', error);
});

export default redis; 