import { Request, Response } from 'express';
import path from 'path';

// Path Traversal sin validación
export const downloadFileVulnerable = (req: Request, res: Response) => {
  const fileName = req.query.file as string;
  const filePath = path.join(__dirname, '../../files', fileName);
  res.download(filePath);
};