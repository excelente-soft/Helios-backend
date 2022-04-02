import express from 'express';
import {
  changeAvatarController,
  changeEmailController,
  changePasswordController,
  changeProfileController,
  changeTypeController,
} from '@controllers/user.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = express.Router();

router.put('/changeProfile', authMiddleware, changeProfileController);
router.put('/changeEmail', authMiddleware, changeEmailController);
router.put('/changePassword', authMiddleware, changePasswordController);
router.put('/changeType', authMiddleware, changeTypeController);
router.put('/changeAvatar', authMiddleware, changeAvatarController);

export default router;
