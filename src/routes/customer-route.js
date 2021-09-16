'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const middleware = require('../service/middleware-service');

router.post('/', middleware.customerMiddleware, controller.post);
router.post('/authenticate', controller.authenticate)

module.exports = router;