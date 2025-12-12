import { Router } from 'express';
import {downloadFileSecure} from '../controllers/fileSecureController';

const router = Router();

router.get('/secure/download/', downloadFileSecure)

export default router;
