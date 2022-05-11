import express from 'express';

import { Controllers } from '@controllers';
import { adminMiddleware } from '@middlewares/admin.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.post('/create-lecture', authMiddleware, adminMiddleware, Controllers.Lecture.createLecture);
router.put('/change-lecture', authMiddleware, adminMiddleware, Controllers.Lecture.changeLecture);
router.delete('/delete-lecture', authMiddleware, adminMiddleware, Controllers.Lecture.deleteLecture);
router.get('/study/lecture/:id', authMiddleware, Controllers.Lecture.readLecture);
router.post('/study/submit-lecture', authMiddleware, Controllers.Lecture.submitLecture);

export default router;
