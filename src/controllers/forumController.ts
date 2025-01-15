import { Request, Response } from 'express';

// XSS (Cross-Site Scripting) vulnerable
export const postCommentVulnerable = (req: Request, res: Response) => {
  const { comment } = req.body;
  res.send(`Comentario recibido: ${comment}`);
};