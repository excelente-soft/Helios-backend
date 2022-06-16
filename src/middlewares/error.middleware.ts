/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { StatusCode } from '@interfaces/status.interface';
import { Utils } from '@utils';

export const errorMiddleware = (
  err: Error | typeof Utils.Exceptions.ControlledException,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Utils.Exceptions.ControlledException) {
    return Utils.Sender.sendToClient(res, null, err.message, err.code);
  }
  return Utils.Sender.sendToClient(res, null, 'Internal server error', StatusCode.INTERNAL_SERVER_ERROR);
};
