const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Ensure the path is correct

// GET endpoint to retrieve all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories from the database
        res.json(categories); // Send the list of categories as JSON
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).send({ error: "An error occurred." });
    }
});

// POST endpoint to create a new category
router.post('/', async (req, res) => {
    try {
        // Extract category details from the request body
        const { name, description } = req.body;

        // Validate the incoming data
        if (!name) {
            return res.status(400).send({ error: "Name is required." });
        }

// Create a new category instance
        const newCategory = new Category({
            name: name,
            description: description || '', // Default to an empty string if description is not provided
        });

        // Save the category to the database
        const createdCategory = await newCategory.save();

        // Send the new category back as a response with a 201 status
        res.status(201).send(createdCategory); // Send the created category as JSON with 201 status
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send({ error: "An error occurred.", success: false });
    }
});

// Get a category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Update a category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});






// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;