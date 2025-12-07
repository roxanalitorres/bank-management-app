"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCommentSecure = void 0;
const dompurify_1 = __importDefault(require("dompurify"));
const express_validator_1 = require("express-validator");
exports.postCommentSecure = [
    // Validación de entradas
    (0, express_validator_1.body)('comment')
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('El comentario debe tener entre 1 y 500 caracteres.'),
    (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { comment } = req.body;
        // Sanitización del comentario
        const sanitizedComment = dompurify_1.default.sanitize(comment);
        res.send(`Comentario publicado: ${sanitizedComment}`);
    },
];
