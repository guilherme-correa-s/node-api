"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/order-controller");
const authService = require('../service/auth-service');

router.get("/", controller.get);
router.post("/", authService.autorize, controller.post);

module.exports = router;
