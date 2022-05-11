import express from 'express';

import { Controllers } from '@controllers';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.put('/change-profile', authMiddleware, Controllers.User.changeProfile);
router.put('/change-email', authMiddleware, Controllers.User.changeEmail);
router.put('/change-password', authMiddleware, Controllers.User.changePassword);
router.put('/change-type', authMiddleware, Controllers.User.changeType);
router.put('/change-avatar', authMiddleware, Controllers.User.changeAvatar);
router.post('/my-role', authMiddleware, Controllers.User.myRole);
router.get('/profile/:nickname', Controllers.User.userProfile);

export default router;
