import redisClient from '../config/redis.js';
import logger from '../utils/logger.js';

export const cacheProducts = async (req, res, next) => {
    try {
        if (!redisClient.isOpen) {
            return next();
        }

        const key = `products:${JSON.stringify(req.query)}`;
        const cachedData = await redisClient.get(key);

        if (cachedData) {
            logger.info('Cache hit for products');
            return res.json(JSON.parse(cachedData));
        }

        
        const originalJson = res.json;
        res.json = (body) => {
            if (body.success) {
                redisClient.setEx(key, 300, JSON.stringify(body)) 
                    .catch(err => logger.error('Redis Cache Set Error', err));
            }
            return originalJson.call(res, body);
        };

        next();
    } catch (err) {
        logger.error('Redis Cache Middleware Error', err);
        next();
    }
};
