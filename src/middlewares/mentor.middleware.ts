import { NextFunction, Request, Response } from 'express';

import { DB } from '@databases';
import { StatusCode } from '@interfaces/status.interface';
import { User } from '@models/user.model';
import { Utils } from '@utils';

export const mentorMiddleware = async (req: Request, _: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Utils.Exceptions.ControlledException('Invalid token', StatusCode.UNAUTHORIZED);
    }
    const selectedUser = await DB.manager.findOne(User, { where: { id: req.user }, relations: ['role'] });
    if (!selectedUser || selectedUser.role.accessLevel < 1) {
      throw new Utils.Exceptions.ControlledException('Do not have permissions', StatusCode.NOT_FOUND);
    }
    req.accessLevel = selectedUser.role.accessLevel;
    next();
  } catch (err) {
    next(err);
  }
};
