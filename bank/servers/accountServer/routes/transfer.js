const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/transferController'))

module.exports = router;