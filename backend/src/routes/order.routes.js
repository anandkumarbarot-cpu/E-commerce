import express from "express";
import { newOrder, getSingleOrder, myOrders } from "../controllers/order.controller.js";
import { validateOrder } from "../middlewares/validation.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/new", validateOrder, newOrder);
router.get("/", protect, myOrders);


export default router;