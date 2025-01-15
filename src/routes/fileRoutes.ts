import { Router } from 'express';
import path from 'path';

const router = Router();

// Descarga de archivos (Path Traversal)
router.get('/download', (req, res) => {
  const fileName = req.query.file as string;
  const filePath = path.join(__dirname, '../../files', fileName);
  res.download(filePath);
});

export default router;
