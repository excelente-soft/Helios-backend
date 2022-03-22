import { CRYPT_SALT } from '@config';
import crypto from 'crypto';

export const generateHash = (data: string) => {
  const hash = crypto.createHmac('sha256', CRYPT_SALT).update(data).digest('hex');
  return hash;
};
