const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/signUp/accountSignUpController'))

module.exports = router;