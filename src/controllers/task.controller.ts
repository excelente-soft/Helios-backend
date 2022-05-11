import { NextFunction, Request, Response } from 'express';

import { Services } from '@services';
import { Utils } from '@utils';

const changeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const array = req.body;
    const changeOrderResult = Services.Task.changeTaskOrder(array);
    return Utils.Sender.sendToClient(res, changeOrderResult);
  } catch (err) {
    next(err);
  }
};

export default { changeOrder };
