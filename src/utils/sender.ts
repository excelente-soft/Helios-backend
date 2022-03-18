import { StatusCode } from '@interfaces/express.codes';
import { Response } from 'express';

export const sendToClient = <T>(res: Response, data: T, message?: string, code = StatusCode.OK) => {
  res.status(code).json({ message, data });
};
