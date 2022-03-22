import { StatusCode } from '@interfaces/status.interface';
import { Response } from 'express';

export const sendToClient = <T>(res: Response, data: T, message?: string, code: StatusCode = StatusCode.OK) => {
  res.status(code).json({ message, data: data });
};
