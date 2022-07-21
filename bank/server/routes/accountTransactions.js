const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/accountTransactionsController'))

module.exports = router;