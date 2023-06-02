const express = require('express');
const registrationController = require('../controllers/regCon');

const router = express.Router();

router.post('/', registrationController.register);

module.exports = router;
