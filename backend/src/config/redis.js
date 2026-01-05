import { createClient } from 'redis';
import logger from '../utils/logger.js';

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
    // Suppress ECONNREFUSED logs to avoid spamming if Redis is not running
    if (err.code === 'ECONNREFUSED') {
        // Optionally log once or just debug
        // logger.warn('Redis Connection Failed');
    } else {
        logger.error('Redis Client Error', err);
    }
});

redisClient.on('connect', () => logger.info('Redis Client Connected'));

// Non-blocking connect
(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        // Failed initial connection
        logger.warn('Initial Redis Connection Failed - Caching disabled');
    }
})();

export default redisClient;
