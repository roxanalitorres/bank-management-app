import { Router } from 'express';

const router = Router();

// Publicar comentario (vulnerable a XSS)
router.post('/comment', (req, res) => {
  const { comment } = req.body;
  res.send(`Comment posted: ${comment}`);
});

export default router;
