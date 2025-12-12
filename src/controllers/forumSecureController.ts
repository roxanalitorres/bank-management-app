import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import he from 'he';


const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export const postCommentSecure = [
  body('comment')
    .trim()
    .not().isEmpty().withMessage('El comentario no puede estar vacío.')
    .isLength({ min: 1, max: 500 })
    .matches(/^[^<>]*$/).withMessage('El comentario no debe contener etiquetas HTML.'),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { comment } = req.body;

    comment = DOMPurify.sanitize(comment, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

    comment = he.encode(comment);

    res.json({ message: 'Comentario publicado', comment });
  },
];
C