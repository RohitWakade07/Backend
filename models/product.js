// models/product.js
const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1, // Minimum length of 1 character
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0.01, // Minimum price
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to Category model
        required: true,
    },
    images: [{
        type: String,
        trim: true,
    }],
    stock: {
        type: Number,
        min: 0, // Non-negative stock
        default: 0, // Default stock value
        required: true
    }
}, {
    timestamps: true // Correctly added here as an option
});

// Middleware to update the updatedAt field before saving
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now(); // Update the updatedAt field
    next();
});

// Export the Product model
module.exports = mongoose.model('Product', productSchema);