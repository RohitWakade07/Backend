const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Ensure the path is correct

// GET endpoint to retrieve all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category'); // Populate category details
        res.json(products); // Send the list of products as JSON
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "An error occurred.", success: false });
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// POST endpoint to create a new product
router.post('/', async (req, res) => {
    try {
        // Extract product details from the request body
        const { name, description, price, category, images, stock } = req.body;

        // Validate the incoming data
        if (!name || !description || !price || !category) {
            return res.status(400).send({ error: "Name, description, price, and category are required." });
        }

        // Create a new product instance
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            images: images || [], // Default to an empty array if images are not provided
            stock: stock || 0, // Default to 0 if stock is not provided
        });

        // Save the product to the database
        const createdProduct = await newProduct.save();

        // Send the new product back as a response with a 201 status
        res.status(201).send(createdProduct); // Send the created product as JSON with 201 status
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send({ error: "An error occurred.", success: false });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;