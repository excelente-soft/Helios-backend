import { Request, Response } from 'express';

export const loginController = async (req: Request, res: Response) => {
  res.status(200).json({ name: 'Andrew' });
};
