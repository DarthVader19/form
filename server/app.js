const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const data = require('./data')

const muri = 'mongodb://127.0.0.1:27017'
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log(data.MONGO_URL);
// Connect to MongoDB
mongoose.connect(data.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set up routes
const registrationRoutes = require('./routes/regRoute');
app.use('/api/register', registrationRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
