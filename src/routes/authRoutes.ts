import { Router } from 'express';

const router = Router();

// Iniciar sesión (sin seguridad)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // SQL Injection: Consulta vulnerable
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  console.log('Query:', query);

  res.send(`Login attempt for user: ${username}`);
});

export default router;
