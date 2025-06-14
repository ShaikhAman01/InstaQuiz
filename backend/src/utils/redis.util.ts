// src/utils/redis.ts or wherever you keep it

import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.UPSTASH_REDIS_URL;

if (!redisUrl) {
  throw new Error('Missing UPSTASH_REDIS_URL in environment variables');
}

console.log('Connecting to Redis:', redisUrl);

export const redisClient = createClient({
  url: redisUrl,
  socket: {
    tls: true,
    host: process.env.REDIS_HOST || 'localhost',
    rejectUnauthorized: false,
  },
  disableClientInfo: true,
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

await redisClient.connect();
console.log('Connected to Redis');
