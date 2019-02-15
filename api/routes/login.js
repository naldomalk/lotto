'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/login');

router.post('/', controller.module.post);
router.delete('/', controller.module.delete);

module.exports = router;