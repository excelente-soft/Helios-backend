import { loginController, signupController, validateController, refreshController } from '@controllers/auth.controller';
import express from 'express';

const router = express.Router();

router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/validate', validateController);
router.post('/refresh', refreshController);

export default router;
