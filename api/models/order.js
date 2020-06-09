const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product:{ 
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'Product', required: true
    },
    quantity: {type: Number, default: 1 },
    ordername: {type: String, required: true },
    rollNo: {type: String, required: true },
    Email: {type: String, required: true },
    mobileno: {type: Number, default: 9999999999},
});

module.exports = mongoose.model('Order', orderSchema);