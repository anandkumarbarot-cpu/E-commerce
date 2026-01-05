import Cart from "../models/Cart.js";

export const updateCart = async (req, res, next) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $set: { items } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).populate("items.productId");

        const formattedCart = {
            ...cart.toObject(),
            items: cart.items.map(item => ({
                productId: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                quantity: item.quantity,
                stock: item.productId.stock,
                image: item.productId.image
            }))
        };

        res.json(formattedCart);
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
        cart.items = cart.items.filter((item) => {
            const itemProductId = item.productId && item.productId._id
                ? item.productId._id.toString()
                : item.productId.toString();

            return itemProductId !== productId;
        });
        await cart.save();

        await cart.populate("items.productId");

        const formattedCart = {
            ...cart.toObject(),
            items: cart.items.map(item => ({
                productId: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                quantity: item.quantity,
                stock: item.productId.stock,
                image: item.productId.image
            }))
        };

        res.json(formattedCart);
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