const express = require('express');

const router = express.Router();
// requiring doctors_api controller action
const doctorsApi = require("../../../controllers/api/v1/doctors_api");
// registering a doctor
router.post('/register', doctorsApi.register);
// creating-session based on JWT on log-in
router.post('/login', doctorsApi.createSession);


module.exports = router;