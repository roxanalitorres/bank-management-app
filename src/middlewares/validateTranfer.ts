import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateTransfer = [
  body('fromAccount')
    .isNumeric().withMessage('El número de cuenta de origen debe ser numérico.')
    .notEmpty().withMessage('El número de cuenta de origen no puede estar vacío.'),

  body('toAccount')
    .isNumeric().withMessage('El número de cuenta de destino debe ser numérico.')
    .notEmpty().withMessage('El número de cuenta de destino no puede estar vacío.'),

  body('amount')
    .isFloat({ gt: 0 }).withMessage('El monto debe ser un número positivo.')
    .not().isString().withMessage('El monto no debe contener caracteres especiales.'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
