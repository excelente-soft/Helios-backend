import { StatusCode } from '@interfaces/status.interface';
import { ControlledException } from '@utils/exceptions';
import { sendToClient } from '@utils/sender';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: Error | ControlledException, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ControlledException) {
    return sendToClient(res, null, err.message, err.code);
  }

  return sendToClient(res, null, 'Internal server error', StatusCode.INTERNAL_SERVER_ERROR);
};
