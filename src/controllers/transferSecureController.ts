import { Request, Response } from 'express';
import csrf from 'csurf';

// CSRF Protection Middleware
const csrfProtection = csrf({ cookie: true });

// Simulación de cuentas para el ejemplo
const accounts = {
  '123': { balance: 1000 },
  '456': { balance: 500 },
};

export const transferFundsSecure = [
  csrfProtection,
  (req: Request, res: Response) => {
    const { fromAccount, toAccount, amount } = req.body;

    if (!fromAccount || !toAccount || isNaN(amount) || amount <= 0) {
      console.warn('Datos de transferencia inválidos:', req.body);
      return res.status(400).send('Datos de transferencia inválidos');
    }

    if (!accounts[fromAccount] || !accounts[toAccount]) {
      console.warn('Cuenta no encontrada:', { fromAccount, toAccount });
      return res.status(404).send('Una o más cuentas no existen');
    }

    if (accounts[fromAccount].balance < amount) {
      console.warn('Fondos insuficientes:', { fromAccount, amount });
      return res.status(400).send('Fondos insuficientes para la transferencia');
    }

    accounts[fromAccount].balance -= amount;
    accounts[toAccount].balance += amount;

    res.send(`Transferencia segura de ${amount} desde ${fromAccount} hacia ${toAccount}`);
  },
];
