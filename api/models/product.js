const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true },
    description: {type: String, required: true },
    quantity: {type: Number, default: 1},
    price: {type: Number, required: true},
    category: {type: String, required: true },
    sellerId: {type: String, required: true },
    image: {type: String, required: false}
});

module.exports = mongoose.model('Product', productSchema);