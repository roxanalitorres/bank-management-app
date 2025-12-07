"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forumSecureController_1 = require("../controllers/forumSecureController");
const forumController_1 = require("../controllers/forumController");
const router = (0, express_1.Router)();
// Ruta para publicar comentarios insegura
router.post('/comments', forumController_1.postCommentVulnerable);
router.post('/comments-secure', forumSecureController_1.postCommentSecure);
exports.default = router;
