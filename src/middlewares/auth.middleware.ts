import { StatusCode } from '@interfaces/status.interface';
import { validateAccessToken } from '@services/token.service';
import { ControlledException } from '@utils/exceptions';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      throw new ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    const userId = validateAccessToken(accessToken);
    if (!userId) {
      throw new ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    req.user = userId;
    next();
  } catch (err) {
    throw new ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
  }
};
