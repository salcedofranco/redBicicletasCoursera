const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token');

router.get('/confirmation/:token', tokenController.confirmationGet);

module.exports = router