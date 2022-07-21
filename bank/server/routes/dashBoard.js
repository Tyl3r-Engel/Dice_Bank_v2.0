const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/dashBoardController'))

module.exports = router;