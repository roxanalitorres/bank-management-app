import { Router } from 'express';
import {postCommentSecure} from '../controllers/forumSecureController';
const router = Router();


router.post('/secure/comments', postCommentSecure);

export default router;