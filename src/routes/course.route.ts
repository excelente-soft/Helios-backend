import express from 'express';
import { CreateCourseController } from '../controllers/course.controller';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/createCourse', authMiddleware, adminMiddleware, CreateCourseController);

export default router;
