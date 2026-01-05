import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const newOrder = async (req, res, next) => {
    try {
        const { items, totalAmount } = req.body;
        const enrichedItems = [];
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
            }
            product.stock -= item.quantity;
            await product.save();
            enrichedItems.push({
                productId: item.productId,
                quantity: item.quantity,
                name: product.name,
                price: product.price,
                image: product.image
            });
        }

        const order = await Order.create({
            userId: req.user.id,
            items: enrichedItems,
            totalAmount
        });
        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};

export const myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.json(orders)
    } catch (err) {
        next(err);
    }
}

export const getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found with this Id" });
        }
        res.json(order);
    } catch (err) {
        next(err);
    }
};