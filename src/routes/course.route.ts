import express from 'express';

import { Controllers } from '@controllers';
import { adminMiddleware } from '@middlewares/admin.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.post('/create-course', authMiddleware, adminMiddleware, Controllers.Course.createCourse);
router.post('/register-to-course', authMiddleware, Controllers.Course.registerToCourse);
router.get('/get-courses', Controllers.Course.courses);
router.get('/get-courses/:name', Controllers.Course.coursePreview);
router.get('/my-courses', authMiddleware, Controllers.Course.userCourses);
router.get('/courses-to-manage', authMiddleware, adminMiddleware, Controllers.Course.coursesToManage);
router.get('/course-management/:courseId', authMiddleware, adminMiddleware, Controllers.Course.courseToManage);
router.put('/change-course', authMiddleware, adminMiddleware, Controllers.Course.changeCourse);
router.get('/study/course/:courseName', authMiddleware, Controllers.Course.courseProgress);
router.post('/get-certificate', authMiddleware, Controllers.Course.getCertificate);

export default router;
