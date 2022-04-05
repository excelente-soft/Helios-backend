import { Request, Response, NextFunction } from 'express';
import { ControlledException } from '@utils/exceptions';
import { StatusCode } from '@interfaces/status.interface';
import DB from '@databases';
import { User } from '../models/user.model';

export const adminMiddleware = async (req: Request, _: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    const selectedUser = await DB.manager.findOne(User, { where: { id: req.user }, relations: ['role'] });
    if (!selectedUser || selectedUser.role.accessLevel < 1) {
      throw new ControlledException('Do not have permissions', StatusCode.NOT_FOUND);
    }
    req.accessLevel = selectedUser.role.accessLevel;
    next();
  } catch (err) {
    next(err);
  }
};
