const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    value:{type: Number, required:true, min:1, max:5},
    user: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'User', required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'Product', required: true
    },
    comments: {type: String, required: false},
    date: { type: Date, default: Date.now },


});

module.exports = mongoose.model('Review', reviewSchema);