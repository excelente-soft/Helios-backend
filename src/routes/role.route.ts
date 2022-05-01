import express from 'express';

import { Controllers } from '@controllers';
import { adminMiddleware } from '@middlewares/admin.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.post('/create-role', authMiddleware, adminMiddleware, Controllers.Role.createRole);

export default router;
