"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginVulnerable = void 0;
// Inseguro: SQL Injection posible
const loginVulnerable = (req, res) => {
    const { username, password } = req.body;
    // Construcción de consulta vulnerable
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log('Query ejecutada:', query);
    // Respuesta sin validación ni sanitización
    res.send(`Intento de inicio de sesión para usuario: ${username}`);
};
exports.loginVulnerable = loginVulnerable;
