// app.js
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => console.log('Database Connection is Ready'))
    .catch((err) => console.log(err));



// Import the route files
const productRoutes = require('./routes/product'); // Adjust the path if necessary
const categoryRoutes = require('./routes/Category'); // Adjust the path if necessary


const api = process.env.API_URL || '/api/v1'; // Default API URL if not set

// Use the routes
app.use(`${api}/products`, productRoutes); // Mount product routes
app.use(`${api}/categories`, categoryRoutes); // Mount category routes

// Start the server
app.listen(3000, () => {
    console.log(`API running at ${api}`);
    console.log('Server is running on http://localhost:3000');
});