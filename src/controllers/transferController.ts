import { Request, Response } from 'express';

// Falta de validación en las transferencias
export const transferFundsVulnerable = (req: Request, res: Response) => {
  const { fromAccount, toAccount, amount } = req.body;
  res.send(`Transferencia de ${amount} desde ${fromAccount} hacia ${toAccount}`);
};
