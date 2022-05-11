import { Response } from 'express';

import { StatusCode } from '@interfaces/status.interface';

const sendToClient = <T>(res: Response, data: T, message?: string, code: StatusCode = StatusCode.OK) => {
  res.status(code).json({ message, data: data });
};

export default { sendToClient };
