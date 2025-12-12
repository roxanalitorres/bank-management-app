import { Router } from 'express';
import { transferFundsSecure } from '../controllers/transferSecureController';

const router = Router();

router.post('/secure/transfer', transferFundsSecure);

export default router;
