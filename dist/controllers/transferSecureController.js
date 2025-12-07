"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferFundsSecure = void 0;
const csurf_1 = __importDefault(require("csurf"));
// CSRF Protection Middleware
const csrfProtection = (0, csurf_1.default)({ cookie: true });
// Simulación de cuentas para el ejemplo
const accounts = {
    '123': { balance: 1000 },
    '456': { balance: 500 },
};
// Función segura para transferencias
exports.transferFundsSecure = [
    csrfProtection, // Protección CSRF
    (req, res) => {
        const { fromAccount, toAccount, amount } = req.body;
        // Validación de entradas
        if (!fromAccount || !toAccount || isNaN(amount) || amount <= 0) {
            console.warn('Datos de transferencia inválidos:', req.body);
            return res.status(400).send('Datos de transferencia inválidos');
        }
        // Validar cuentas
        if (!accounts[fromAccount] || !accounts[toAccount]) {
            console.warn('Cuenta no encontrada:', { fromAccount, toAccount });
            return res.status(404).send('Una o más cuentas no existen');
        }
        // Verificar saldo
        if (accounts[fromAccount].balance < amount) {
            console.warn('Fondos insuficientes:', { fromAccount, amount });
            return res.status(400).send('Fondos insuficientes para la transferencia');
        }
        // Procesar transferencia
        accounts[fromAccount].balance -= amount;
        accounts[toAccount].balance += amount;
        res.send(`Transferencia segura de ${amount} desde ${fromAccount} hacia ${toAccount}`);
    },
];
