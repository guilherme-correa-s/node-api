'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../service/auth-service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/adm/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
router.post('/', authService.autorize, controller.post);
router.put('/:id', authService.autorize, controller.put);
router.delete('/:id',  authService.autorize, controller.delete);

module.exports = router;