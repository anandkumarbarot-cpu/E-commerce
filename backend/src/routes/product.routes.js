import express from "express";
import { getProducts, getProductsById } from "../controllers/product.controller.js";
import { cacheProducts } from "../middlewares/cache.middleware.js";

const router = express.Router();



router.get("/", getProducts);


router.get("/:id", getProductsById)


export default router;