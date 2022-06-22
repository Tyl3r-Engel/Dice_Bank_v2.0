const express = require('express');
const router = express.Router();
const path = require('path');
router.post('/', require('../controllers/registerController'));

router.get('/', (req, res) => res.sendFile('index.html', { root: path.join(__dirname, '../../build') }));

module.exports = router;