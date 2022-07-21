const express = require('express');
const router = express.Router();
router.post('/', require('../controllers/accountNameChangeController'))

module.exports = router;