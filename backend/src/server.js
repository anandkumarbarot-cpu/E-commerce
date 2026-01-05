import http, { Server } from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import "./config/env.js";

import seedProducts from "./seeders/product.seeder.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize DB and Seeder
const init = async () => {
    try {
        await connectDB();

        if (process.env.SEED_DATA === "true") {
            console.log("Seeding data check...");
            await seedProducts();
        }

        server.listen(PORT, () => console.log(`server running on ${PORT}`));
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

init();