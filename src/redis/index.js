import dotenv from 'dotenv';
import { Cache } from 'cache-store-manager';

dotenv.config();

let redisCache;

if (process.env.NODE_ENV === 'test') {
    redisCache = {};
} else {
    redisCache = Cache.create('redis', {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        db: '0',
        ttl: 60 * 1000 // milliseconds
    });
}

export { redisCache };