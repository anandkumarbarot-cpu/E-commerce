import express from "express";
import { updateCart, removeCartItem, clearCart } from "../controllers/cart.controller.js";
import { validateCartItem } from "../middlewares/validation.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();




router.post("/", protect, validateCartItem, updateCart);

router.delete("/:productId", protect, removeCartItem);
router.delete("/", protect, clearCart);




export default router;