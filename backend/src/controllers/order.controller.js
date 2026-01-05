import Order from "../models/Order.js";

export const newOrder = async (req, res, next) => {
    try {
        const order = await Order.create({
            userId: req.user.id,
            items: req.body.items,
            totalAmount: req.body.totalAmount
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