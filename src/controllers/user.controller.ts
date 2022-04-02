import { changeEmail, changeProfile, changePassword, changeType, changeAvatar } from '@services/user.service';
import { validateBody } from '@utils/joiSchamas';
import { sendToClient } from '@utils/sender';
import { NextFunction, Request, Response } from 'express';

export const changeProfileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, secondName, nickname } = req.body;
    validateBody({ name, secondName, nickname }, 'ChangeProfileSchema');
    const changedUser = await changeProfile(req.user || '', name, secondName, nickname);
    return sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};

export const changeEmailController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    validateBody({ email, password }, 'ChangeEmailSchema');
    const changedUser = await changeEmail(req.user || '', email, password);
    return sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};

export const changePasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body;
    validateBody({ currentPassword, newPassword }, 'ChangePasswordSchema');
    const changedUser = await changePassword(req.user || '', currentPassword, newPassword);
    return sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};

export const changeTypeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.body;
    validateBody({ type }, 'ChangeTypeSchema');
    const changedUser = await changeType(req.user || '', type);
    return sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};

export const changeAvatarController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;
    validateBody({ avatar }, 'ChangeAvatarSchema');
    const changedUser = await changeAvatar(req.user || '', avatar);
    return sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};
