const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/accountSignUpController'))

module.exports = router;