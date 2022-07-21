const express = require('express');
const router = express.Router();
router.delete('/', require('../controllers/deleteAccountController'))

module.exports = router;