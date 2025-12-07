"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileController_1 = require("../controllers/fileController");
const fileSecureController_1 = require("../controllers/fileSecureController");
const router = (0, express_1.Router)();
// Ruta para descarga de archivos insegura
router.get('/files', fileController_1.downloadFileVulnerable);
router.get('/secure/files/', fileSecureController_1.downloadFileSecure);
exports.default = router;
