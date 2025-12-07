"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transferController_1 = require("../controllers/transferController");
const router = (0, express_1.Router)();
// Ruta para transferencias insegura
router.post('/transfer', transferController_1.transferFundsVulnerable);
exports.default = router;
