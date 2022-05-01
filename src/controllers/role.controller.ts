import { NextFunction, Request, Response } from 'express';

import { Services } from '@services';
import { Utils } from '@utils';

const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessLevel, color, roleName } = req.body;
    Utils.Validator.validateBody({ accessLevel, color, roleName }, 'CreateRoleSchema');
    const createdRole = await Services.Role.createRole(req.accessLevel || 0, accessLevel, color, roleName);
    return Utils.Sender.sendToClient(res, createdRole);
  } catch (err) {
    next(err);
  }
};

export default {
  createRole,
};
