// app.js
console.log("hello Lienzo");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

// Import the Product model
const Product = require('./models/Product'); // Make sure this path is correct
const Category = require('./models/Category'); // Importing Category model if needed

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const api = process.env.API_URL || '/api/v1'; // Default API URL if not set

// GET endpoint to retrieve all products
app.get(`${api}/products`, async (req, res) => {
    try {
        const products = await Product.find().populate('category'); // Populate category details
        res.json(products); // Send the list of products as JSON
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "An error occurred." });
    }
});

// POST endpoint to create a new product
app.post(`${api}/products`, async (req, res) => {
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