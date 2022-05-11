import express from 'express';

import { Controllers } from '@controllers';
import { adminMiddleware } from '@middlewares/admin.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.post('/create-test', authMiddleware, adminMiddleware, Controllers.Test.createTest);
router.put('/change-test', authMiddleware, adminMiddleware, Controllers.Test.changeTest);
router.delete('/delete-test', authMiddleware, adminMiddleware, Controllers.Test.deleteTest);
router.post('/study/submit-test', authMiddleware, Controllers.Test.submitTest);
router.get('/study/test/:id', authMiddleware, Controllers.Test.getPreparedTest);
router.post('/create-quest', authMiddleware, adminMiddleware, Controllers.Test.createQuest);
router.put('/change-quest', authMiddleware, adminMiddleware, Controllers.Test.changeQuest);
router.delete('/delete-quest', authMiddleware, adminMiddleware, Controllers.Test.deleteQuest);
router.post('/create-answer', authMiddleware, adminMiddleware, Controllers.Test.createAnswer);
router.put('/change-answer', authMiddleware, adminMiddleware, Controllers.Test.changeAnswer);
router.delete('/delete-answer', authMiddleware, adminMiddleware, Controllers.Test.deleteAnswer);

export default router;
