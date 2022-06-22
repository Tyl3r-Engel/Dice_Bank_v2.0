const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/loginController'))

module.exports = router;