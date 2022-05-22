import express from 'express';

import { Controllers } from '@controllers';
import { adminMiddleware } from '@middlewares/admin.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.put('/change-profile', authMiddleware, Controllers.User.changeProfile);
router.put('/change-email', authMiddleware, Controllers.User.changeEmail);
router.put('/change-password', authMiddleware, Controllers.User.changePassword);
router.put('/change-type', authMiddleware, Controllers.User.changeType);
router.put('/change-avatar', authMiddleware, Controllers.User.changeAvatar);
router.put('/change-role', authMiddleware, adminMiddleware, Controllers.User.changeRole);
router.post('/my-role', authMiddleware, Controllers.User.myRole);
router.get('/profile/:nickname', Controllers.User.userProfile);
router.get('/profile/full/:nickname', authMiddleware, adminMiddleware, Controllers.User.fullUserProfile);
router.get('/profile/me/:nickname', authMiddleware, Controllers.User.selfUserProfile);
router.get('/profile/courses/:userId', Controllers.User.userCourses);
router.get('/certificates', authMiddleware, Controllers.User.certificates);
router.get('/certificates/:id', Controllers.User.certificate);

export default router;
