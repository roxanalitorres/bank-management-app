"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferFundsVulnerable = void 0;
// Inseguro: Sin protección contra CSRF
const transferFundsVulnerable = (req, res) => {
    const { fromAccount, toAccount, amount } = req.body;
    res.send(`Transferencia de ${amount} desde ${fromAccount} hacia ${toAccount}`);
};
exports.transferFundsVulnerable = transferFundsVulnerable;
