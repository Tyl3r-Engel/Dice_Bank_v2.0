const express = require('express');
const router = express.Router();
router.delete('/', require('../controllers/accountDeleteController'))

module.exports = router;