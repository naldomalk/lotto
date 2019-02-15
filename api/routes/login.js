'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/login');

router.get('/', controller.module.get);
router.post('/', controller.module.post);
router.delete('/', controller.module.delete);

module.exports = router;