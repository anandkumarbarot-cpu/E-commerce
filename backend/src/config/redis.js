import { createClient } from 'redis';
import logger from '../utils/logger.js';

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
    
    if (err.code === 'ECONNREFUSED') {
        
        
    } else {
        logger.error('Redis Client Error', err);
    }
});

redisClient.on('connect', () => logger.info('Redis Client Connected'));


(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        
        logger.warn('Initial Redis Connection Failed - Caching disabled');
    }
})();

export default redisClient;
