import { loginController } from '@controllers/auth.controller';
import express from 'express';

const router = express.Router();

router.get('/', loginController);

export default router;
