import { Router } from 'express';
import { loginSecure } from '../controllers/authSecureController';

const router = Router();

router.post('/secure/login', loginSecure);

export default router;
