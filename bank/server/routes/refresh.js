const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/refreshTokenController'))

module.exports = router;