"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCommentVulnerable = void 0;
// Inseguro: Permite XSS
const postCommentVulnerable = (req, res) => {
    const { comment } = req.body;
    res.send(`Comentario publicado: ${comment}`);
};
exports.postCommentVulnerable = postCommentVulnerable;
a;
