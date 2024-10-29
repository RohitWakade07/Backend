const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    discount: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0,
    },
    preTaxTotal: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    tax: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    total: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
});

const shippingSchema = new mongoose.Schema({
    address: {
        type: String,
        enum: ['Kondhwa Campus', 'Bibwewadi Campus'], // Restricting to two options
        required: true,
    },
    carrier: {
        type: String,
        required: true,
    },
    tracking: {
        type: String,
        trim: true,
    },
});

const orderSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment', // Reference to Payment model
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'canceled'],
        default: 'pending',
    },

    
    totalCost: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    items: [itemSchema],
    shipping: shippingSchema,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the updatedAt field before saving
orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Order', orderSchema);