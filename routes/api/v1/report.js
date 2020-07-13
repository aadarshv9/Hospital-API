const express = require('express');
const passport = require('passport');

const router = express.Router();
const reportsApi = require("../../../controllers/api/v1/reports_api");

// doctor can check reports on status basis after JWT is verified
router.get('/:status', passport.authenticate('jwt', {session: false}), reportsApi.reportsByStatus);


module.exports = router;