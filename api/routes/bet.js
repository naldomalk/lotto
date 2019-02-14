'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/bet');

router.get('/', controller.get);
router.post('/bet', controller.post);

module.exports = router;