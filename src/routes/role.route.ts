import express from 'express';

import { Controllers } from '@controllers';
import { adminMiddleware } from '@middlewares/admin.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.post('/create-role', authMiddleware, adminMiddleware, Controllers.Role.createRole);
router.get('/get-roles', authMiddleware, adminMiddleware, Controllers.Role.roles);

export default router;
