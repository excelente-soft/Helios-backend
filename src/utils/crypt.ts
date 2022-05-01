import crypto from 'crypto';

import { CRYPT_SALT } from '@config';

const generateHash = (data: string) => {
  const hash = crypto.createHmac('sha256', CRYPT_SALT).update(data).digest('hex');
  return hash;
};

export default { generateHash };
