const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/transfer/transferController'))

module.exports = router;