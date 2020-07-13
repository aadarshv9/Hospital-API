const express = require('express');

const router = express.Router();
// doctors router
router.use('/doctors', require('./doctor'));
// patient router
router.use('/patients', require('./patient'));
// reports router
router.use('/reports', require('./report'));

module.exports = router;