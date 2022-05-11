import express from 'express';

import { Controllers } from '@controllers';
import { adminMiddleware } from '@middlewares/admin.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.put('/change-order', authMiddleware, adminMiddleware, Controllers.Task.changeOrder);

export default router;
