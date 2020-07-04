const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true },
    description: {type: String, required: true },
    quantity: {type: Number, default: 1},
    price: {type: Number, required: true},
    category: {type: String, required: true },
    sellerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Seller', required: true
    },
    image: {type: String, required: false},
    approved: {type: String, default: "pending"}
});

module.exports = mongoose.model('Product', productSchema);