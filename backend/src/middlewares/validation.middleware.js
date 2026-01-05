import { body, validationResult } from 'express-validator';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateCartItem = [
    body('items').isArray().withMessage('Items must be an array'),
    body('items.*.productId').isMongoId().withMessage('Invalid Product ID'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    validate
];

export const validateOrder = [
    body('items').isArray().withMessage('Order items must be an array'),
    validate
];
