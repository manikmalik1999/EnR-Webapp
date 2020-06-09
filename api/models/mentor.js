const mongoose = require('mongoose');

const mentorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true },
    Company: {type: String, required: true },
    Designation: {type: String, require: true},
    Specialization: {type: String, required: false}
});

module.exports = mongoose.model('Mentor', mentorSchema);