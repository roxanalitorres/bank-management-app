import { Router } from 'express';

const router = Router();

// Realizar transferencia (sin validación)
router.post('/send', (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;
  res.send(`Transferred ${amount} from ${fromAccount} to ${toAccount}`);
});

export default router;