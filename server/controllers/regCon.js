const Registration = require('../models/reg');
const Country = require('../models/country');
const State = require('../models/state');
const City = require('../models/city');

exports.register = async (req, res) => {
    const registrationData = req.body;

    // Validate age (must be older than 14 years)
    const currentDate = new Date();
    const birthDate = new Date(registrationData.dob);
    const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000)); // Calculating age in years
    if (age < 14) {
        return res.status(400).send('You must be at least 14 years old to register.');
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(registrationData.email)) {
        return res.status(400).send('Invalid email format.');
    }

    try {
        // Check if the country exists in the database
        const country = await Country.findOne({ name: registrationData.country });
        if (!country) {
            return res.status(400).send('Invalid country.');
        }

        // Check if the state exists in the database and belongs to the selected country
        const state = await State.findOne({ name: registrationData.state, country: country._id });
        if (!state) {
            return res.status(400).send('Invalid state.');
        }

        // Check if the city exists in the database and belongs to the selected state
        const city = await City.findOne({ name: registrationData.city, state: state._id });
        if (!city) {
            return res.status(400).send('Invalid city.');
        }

        // Save the registration data to the database
        const registration = new Registration(registrationData);
        registration.save((err, savedRegistration) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving registration data.');
            } else {
                res.status(200).send('Registration successful!');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error validating registration data.');
    }
};
