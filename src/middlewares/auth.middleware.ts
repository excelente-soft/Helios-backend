import { NextFunction, Request, Response } from 'express';

import { StatusCode } from '@interfaces/status.interface';
import { Services } from '@services';
import { Utils } from '@utils';

export const authMiddleware = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Utils.Exceptions.ControlledException('Invalid token1', StatusCode.UNAUTHORIZED);
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      throw new Utils.Exceptions.ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    const userId = Services.Token.validateAccessToken(accessToken);
    if (!userId) {
      throw new Utils.Exceptions.ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    req.user = userId;
    next();
  } catch (err) {
    next(err);
  }
};

