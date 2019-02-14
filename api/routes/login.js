'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/login');

router.put('/login', controller.put);
router.post('/login', controller.post);
router.delete('/login', controller.delete);

module.exports = router;