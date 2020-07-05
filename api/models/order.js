const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, required: true },
    quantity: {type: Number, required: true},
    product:{ 
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'Product', required: true
    },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);