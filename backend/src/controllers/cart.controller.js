import Cart from "../models/Cart.js";

export const updateCart = async (req, res, next) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        // Use findOneAndUpdate with upsert to handle both creation and update atomically
        // This is a simplified approach; for true item-level atomicity, we might need more complex logic
        // but this is better than find -> modify in memory -> save
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $set: { items } }, // Replacing items list entirely as per original logic, but atomically
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json(cart);
    } catch (err) {
        next(err);
    }
};

export const removeCartItem = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: "cart not found" });
        }
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    }
    catch (err) {
        next(err);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        await Cart.findByIdAndUpdate({ userId: req.user.id }, { items: [] }

        );

        res.json({ message: "cart cleared" });
    }
    catch (err) {
        next(err);
    }
};