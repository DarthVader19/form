const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    state: String,
    city: String,
    gender: String,
    dob: Date,
    age: Number
});

module.exports = mongoose.model('Registration', registrationSchema);
