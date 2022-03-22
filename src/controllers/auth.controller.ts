import { auth, refresh, signup } from '@services/user.service';
import { validateBody } from '@utils/joiSchamas';
import { sendToClient } from '@utils/sender';
import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '@interfaces/status.interface';
import { validateAccessToken } from '@services/token.service';
import { ControlledException } from '@utils/exceptions';

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body;
    validateBody({ login, password }, 'LoginSchema');
    const authResult = await auth(login, password);
    return sendToClient(res, authResult);
  } catch (err) {
    next(err);
  }
};

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, secondName, nickname, email, password } = req.body;
    validateBody({ name, secondName, nickname, email, password }, 'SignupSchema');
    const signupResult = await signup(name, secondName, nickname, email, password);
    return sendToClient(res, signupResult);
  } catch (err) {
    next(err);
  }
};

export const validateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    validateBody({ authorization }, 'AuthorizationSchema');
    const accessToken = authorization?.split(' ')[1];
    if (!accessToken) {
      throw new ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    const userId = validateAccessToken(accessToken);
    if (!userId) {
      throw new ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    return sendToClient(res, true);
  } catch (err) {
    next(err);
  }
};

export const refreshController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    validateBody({ refreshToken }, 'RefreshTokenSchema');
    const userData = await refresh(refreshToken);
    return sendToClient(res, userData);
  } catch (e) {
    next(e);
  }
};
