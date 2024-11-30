const express = require('express');
const Cart = require('./CartModel');
const Product = require('../Product/ProductModel');

const CartRouter = express.Router();

// Get all cart items for a user
CartRouter.get('/:userId', async (req, res) => {
    try {
        const cartItems = await Cart.find({ user_id: req.params.userId }).populate('product_id');
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add to cart
CartRouter.post('/', async (req, res) => {
    const { user_id, product_id } = req.body;
    try {
        const newCartItem = new Cart({ user_id, product_id });
        await newCartItem.save();
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove from cart
CartRouter.delete('/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = CartRouter;
