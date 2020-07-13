const express = require('express');
const patientsApi = require("../../../controllers/api/v1/patients_api");

const router = express.Router();
const passport = require('passport');

// doctor can register a patient once JWT gets verified  
router.post('/register', passport.authenticate('jwt', {session: false}), patientsApi.register);
// doctor can create a patient report once JWT gets verified 
router.post('/:id/create_report', passport.authenticate('jwt', {session: false}), patientsApi.createReport);
// patient can check his/her reports on providing right credentials
router.post('/:id/all_reports', patientsApi.allReports);

module.exports = router;