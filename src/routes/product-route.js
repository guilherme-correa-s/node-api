'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../service/auth-service');
const middleware = require('../service/middleware-service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/adm/:id', middleware.idMiddleware, controller.getById);
router.get('/tags/:tag', controller.getByTag);
router.post('/', authService.isAdmin, middleware.idMiddleware, controller.post);
router.put('/:id', authService.isAdmin, middleware.idMiddleware, controller.put);
router.delete('/:id',  authService.isAdmin, middleware.idMiddleware, controller.delete);

module.exports = router;