import express from 'express';

import { Controllers } from '@controllers';
import { adminMiddleware } from '@middlewares/admin.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';
import { mentorMiddleware } from '@middlewares/mentor.middleware';

const router = express.Router();

router.post('/create-practice', authMiddleware, adminMiddleware, Controllers.Practice.createPractice);
router.put('/change-practice', authMiddleware, adminMiddleware, Controllers.Practice.changePractice);
router.delete('/delete-practice', authMiddleware, adminMiddleware, Controllers.Practice.deletePractice);
router.post('/submit-practice', authMiddleware, Controllers.Practice.submitPractice);
router.get('/study/practice/:id', authMiddleware, Controllers.Practice.getPreparedPractice);
router.get('/feedbacks-chart', authMiddleware, mentorMiddleware, Controllers.Practice.getFeedbacks);
router.get('/task-queue', authMiddleware, mentorMiddleware, Controllers.Practice.getTaskQueue);
router.get('/task-review/:id', authMiddleware, mentorMiddleware, Controllers.Practice.getTaskReview);
router.post('/submit-feedback', authMiddleware, mentorMiddleware, Controllers.Practice.submitFeedback);
router.get('/feedbacks-practice/:courseId/:practiceId', authMiddleware, Controllers.Practice.userFeedbacks);

export default router;
