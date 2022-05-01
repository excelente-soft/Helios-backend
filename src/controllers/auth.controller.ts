import { NextFunction, Request, Response } from 'express';

import { StatusCode } from '@interfaces/status.interface';
import { Services } from '@services';
import { Utils } from '@utils';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body;
    Utils.Validator.validateBody({ login, password }, 'LoginSchema');
    const authResult = await Services.User.auth(login, password);
    return Utils.Sender.sendToClient(res, authResult);
  } catch (err) {
    next(err);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, secondName, nickname, email, password } = req.body;
    Utils.Validator.validateBody({ name, secondName, nickname, email, password }, 'SignupSchema');
    const signupResult = await Services.User.signup(name, secondName, nickname, email, password);
    return Utils.Sender.sendToClient(res, signupResult);
  } catch (err) {
    next(err);
  }
};

const validate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    Utils.Validator.validateBody({ authorization }, 'AuthorizationSchema');
    const accessToken = authorization?.split(' ')[1];
    if (!accessToken) {
      throw new Utils.Exceptions.ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    const userId = Services.Token.validateAccessToken(accessToken);
    if (!userId) {
      throw new Utils.Exceptions.ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    return Utils.Sender.sendToClient(res, true);
  } catch (err) {
    next(err);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    Utils.Validator.validateBody({ refreshToken }, 'RefreshTokenSchema');
    const userData = await Services.User.refresh(refreshToken);
    return Utils.Sender.sendToClient(res, userData);
  } catch (e) {
    next(e);
  }
};

export default {
  login,
  signup,
  validate,
  refresh,
};

