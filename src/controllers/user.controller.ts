import { NextFunction, Request, Response } from 'express';

import { Services } from '@services';
import { Utils } from '@utils';

const changeProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, secondName, nickname } = req.body;
    Utils.Validator.validateBody({ name, secondName, nickname }, 'ChangeProfileSchema');
    const changedUser = await Services.User.changeProfile(req.user || '', name, secondName, nickname);
    return Utils.Sender.sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};

const changeEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    Utils.Validator.validateBody({ email, password }, 'ChangeEmailSchema');
    const changedUser = await Services.User.changeEmail(req.user || '', email, password);
    return Utils.Sender.sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body;
    Utils.Validator.validateBody({ currentPassword, newPassword }, 'ChangePasswordSchema');
    const changedUser = await Services.User.changePassword(req.user || '', currentPassword, newPassword);
    return Utils.Sender.sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};

const changeType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.body;
    Utils.Validator.validateBody({ type }, 'ChangeTypeSchema');
    const changedUser = await Services.User.changeType(req.user || '', type);
    return Utils.Sender.sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};

const changeAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;
    Utils.Validator.validateBody({ avatar }, 'ChangeAvatarSchema');
    const changedUser = await Services.User.changeAvatar(req.user || '', avatar);
    return Utils.Sender.sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};

export default {
  changeProfile,
  changeEmail,
  changePassword,
  changeType,
  changeAvatar,
};
