import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./utils/logger.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger.js";

import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("combined", { stream: { write: message => logger.info(message.trim()) } }));
app.use(apiLimiter);
app.set('query parser', 'extended');

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(errorHandler);

export default app;