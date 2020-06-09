const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true },
    description: {type: String, required: true },
    quantity: {type: Number, default: 1},
    dataSheet: {type: String, required: false, default: "https://www.datasheets360.com/" }
});

module.exports = mongoose.model('Product', productSchema);