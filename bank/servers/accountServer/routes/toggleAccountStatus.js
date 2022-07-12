const express = require('express');
const router = express.Router();
router.post('/', require('../controllers/toggleAccountStatusController'))

module.exports = router;