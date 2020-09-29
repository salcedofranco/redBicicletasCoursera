const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token');

router.get('/confirmation/:token', tokenController.confirmation_get);

module.exports = router