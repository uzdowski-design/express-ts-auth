import crypto from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.AUTH_SECRET;

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};

export const random = () => crypto.randomBytes(128).toString('base64');
