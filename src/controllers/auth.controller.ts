import { sendToClient } from '@utils/sender';
import { Request, Response } from 'express';

export const loginController = async (req: Request, res: Response) => {
  return sendToClient(res, { name: 'Test' }, 'Hello', 202);
};
