const express = require('express');
const Product = require('./ProductModel');
const ProductRouter = express.Router();

// Get all products
ProductRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a new product
ProductRouter.post('/', async (req, res) => {
    const { name, price, image, description } = req.body;
    try {
        const newProduct = new Product({ name, price, image, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a product
ProductRouter.put('/:id', async (req, res) => {
    const { name, price, image, description } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, image, description },
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a product
ProductRouter.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = ProductRouter;
