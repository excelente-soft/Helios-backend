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

const changeRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleName, userId } = req.body;
    Utils.Validator.validateBody({ roleName, userId }, 'ChangeRoleSchema');
    const changedUser = await Services.User.changeRole(req.user || '', roleName, userId);
    return Utils.Sender.sendToClient(res, changedUser);
  } catch (err) {
    next(err);
  }
};

const myRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { avatar, email, name, nickname, secondName, type } = req.body;
    Utils.Validator.validateBody({ avatar, email, name, nickname, secondName, type }, 'UserRoleSchema');
    const userRole = await Services.User.userRole(req.user || '', avatar, email, name, nickname, secondName, type);
    return Utils.Sender.sendToClient(res, userRole);
  } catch (err) {
    next(err);
  }
};

const userProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nickname } = req.params;
    const userProfile = await Services.User.userProfile(nickname);
    return Utils.Sender.sendToClient(res, userProfile);
  } catch (err) {
    next(err);
  }
};

const fullUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nickname } = req.params;
    const fullUserProfile = await Services.User.fullUserProfile(nickname, req.accessLevel || 0);
    return Utils.Sender.sendToClient(res, fullUserProfile);
  } catch (err) {
    next(err);
  }
};

const selfUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nickname } = req.params;
    const fullUserProfile = await Services.User.selfUserProfile(nickname, req.user || '');
    return Utils.Sender.sendToClient(res, fullUserProfile);
  } catch (err) {
    next(err);
  }
};

const userCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const fullUserProfile = await Services.User.userCourses(userId);
    return Utils.Sender.sendToClient(res, fullUserProfile);
  } catch (err) {
    next(err);
  }
};

const certificates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fullUserProfile = await Services.User.certificates(req.user || '');
    return Utils.Sender.sendToClient(res, fullUserProfile);
  } catch (err) {
    next(err);
  }
};

const certificate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const certificate = await Services.User.certificate(id);
    return Utils.Sender.sendToClient(res, certificate);
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
  myRole,
  userProfile,
  fullUserProfile,
  userCourses,
  selfUserProfile,
  changeRole,
  certificates,
  certificate,
};
