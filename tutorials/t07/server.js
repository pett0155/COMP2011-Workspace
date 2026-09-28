import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import Product from './models/Product.js';

const app = express();

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

connectDB();

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            message: "Data inserted successfully",
            product: newProduct
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find(req.query);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            error: "Invalid ID format"
        });
    }
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log(`Server actively running on port ${PORT}`);
});