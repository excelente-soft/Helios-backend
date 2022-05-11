import express from 'express';

import { Controllers } from '@controllers';
import { adminMiddleware } from '@middlewares/admin.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.post('/create-practice', authMiddleware, adminMiddleware, Controllers.Practice.createPractice);
router.put('/change-practice', authMiddleware, adminMiddleware, Controllers.Practice.changePractice);
router.delete('/delete-practice', authMiddleware, adminMiddleware, Controllers.Practice.deletePractice);
router.post('/submit-practice', authMiddleware, Controllers.Practice.submitPractice);
router.get('/study/practice/:id', authMiddleware, Controllers.Practice.getPreparedPractice);

export default router;
