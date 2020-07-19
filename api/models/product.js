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
    image: {type: String, default:"uploads/default-image.jpg"},
    image2: {type: String, default:"uploads/default-image.jpg"},
    image3: {type: String, default:"uploads/default-image.jpg"},
    approved: {type: String, default: "pending"},
    review: {type: Number, default: 0}
});

module.exports = mongoose.model('Product', productSchema);