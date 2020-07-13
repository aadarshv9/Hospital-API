const express = require('express');

const router = express.Router();
// router for api
router.use('/api', require('./api'));

module.exports = router;