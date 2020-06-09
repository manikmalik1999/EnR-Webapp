const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ProjectName: {type: String, required: true },
    TeamName: {type: String, required: true },
    Description: {type: String, require: true},
    links: {type: String, required: false},
    email: {type: email, required: true},
    contactNo : {type: Number, required: true}
});

module.exports = mongoose.model('Project', projectSchema);