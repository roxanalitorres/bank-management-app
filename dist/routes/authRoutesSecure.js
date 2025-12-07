"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authSecureController_1 = require("../controllers/authSecureController");
const router = (0, express_1.Router)();
router.post('/login', authSecureController_1.loginSecure);
exports.default = router;
