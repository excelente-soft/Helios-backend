import express from 'express';

import { Controllers } from '@controllers';
import { adminMiddleware } from '@middlewares/admin.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.put('/change-lecture', authMiddleware, adminMiddleware, Controllers.Task.changeLecture);
router.delete('/delete-lecture', authMiddleware, adminMiddleware, Controllers.Task.deleteLecture);
router.delete('/delete-test', authMiddleware, adminMiddleware, Controllers.Task.deleteTest);
router.delete('/delete-quest', authMiddleware, adminMiddleware, Controllers.Task.deleteQuest);
router.post('/create-lecture', authMiddleware, adminMiddleware, Controllers.Task.createLecture);
router.post('/create-test', authMiddleware, adminMiddleware, Controllers.Task.createTest);
router.put('/change-order', authMiddleware, adminMiddleware, Controllers.Task.changeOrder);
router.put('/change-test-name', authMiddleware, adminMiddleware, Controllers.Task.changeTestName);
router.put('/change-question', authMiddleware, adminMiddleware, Controllers.Task.changeQuest);
router.post('/create-question', authMiddleware, adminMiddleware, Controllers.Task.createQuest);
router.put('/change-answer', authMiddleware, adminMiddleware, Controllers.Task.changeAnswer);
router.delete('/delete-answer', authMiddleware, adminMiddleware, Controllers.Task.deleteAnswer);
router.post('/create-answer', authMiddleware, adminMiddleware, Controllers.Task.createAnswer);
router.post('/create-practice', authMiddleware, adminMiddleware, Controllers.Task.createPractice);
router.delete('/delete-practice', authMiddleware, adminMiddleware, Controllers.Task.deletePractice);
router.put('/change-practice', authMiddleware, adminMiddleware, Controllers.Task.changePractice);

export default router;
