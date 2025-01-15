import { Request, Response } from 'express';

// Simulación de SQL Injection en autenticación
export const loginVulnerable = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Query vulnerable a SQL Injection
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  console.log('Query ejecutada:', query);

  res.send(`Intento de inicio de sesión para usuario: ${username}`);
};