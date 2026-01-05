import express from "express";
import { updateCart, removeCartItem, clearCart } from "../controllers/cart.controller.js";
import { validateCartItem } from "../middlewares/validation.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: The cart managing API
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Update cart items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: The updated cart
 */
router.post("/", protect, validateCartItem, updateCart);

router.delete("/:productId", protect, removeCartItem);
router.delete("/", protect, clearCart);




export default router;