const express = require('express');

const router = express.Router();

// router for api version v1 i.e "/api/v1"
router.use('/v1', require('./v1'));

module.exports = router;