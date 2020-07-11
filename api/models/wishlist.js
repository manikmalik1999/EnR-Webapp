const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, required: true },
    productId: {type: String, required: true},
    name: {type: String, required: true },
    description: {type: String, required: true },
    price: {type: Number, required: true},
    category: {type: String, required: true },
    sellerId: {type: String, required: true },
    image: {type: String, required: false}
});

module.exports = mongoose.model('Whishlist', wishlistSchema);