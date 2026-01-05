import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const dummyProducts = [
    {
        name: "Wireless Headphones",
        price: 99.99,
        category: "Electronics",
        stock: 50,
        rating: 4.5
    },
    {
        name: "Smart Watch",
        price: 149.99,
        category: "Electronics",
        stock: 30,
        rating: 4.2
    },
    {
        name: "Running Shoes",
        price: 79.99,
        category: "Sports",
        stock: 100,
        rating: 4.8
    },
    {
        name: "Coffee Maker",
        price: 49.99,
        category: "Home",
        stock: 20,
        rating: 4.0
    },
    {
        name: "Backpack",
        price: 39.99,
        category: "Fashion",
        stock: 150,
        rating: 4.6
    },
    {
        name: "Gaming Mouse",
        price: 59.99,
        category: "Electronics",
        stock: 45,
        rating: 4.7
    }
];

const seedProducts = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await connectDB();
        }

        // Check if products already exist
        const existingCount = await Product.countDocuments();

        if (existingCount > 0) {
            console.log(`Database already has ${existingCount} products. Skipping seed.`);
            return;
        }

        // Insert new products
        await Product.insertMany(dummyProducts);
        console.log(`Successfully seeded ${dummyProducts.length} products!`);

    } catch (error) {
        console.error("Error seeding products:", error);
        throw error;
    }
};

// Check if this file is the main module (standalone run)
if (process.argv[1] === import.meta.filename || process.argv[1].endsWith('product.seeder.js')) {
    seedProducts().then(() => {
        console.log('Seeding complete/skipped (standalone).');
        process.exit(0);
    }).catch(() => {
        process.exit(1);
    });
}

export default seedProducts;
