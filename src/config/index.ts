import { config } from 'dotenv';
config({ path: '.env' });

export const {
  PORT = 5000,
  VERSION = 1,
  ACCESS_TOKEN_SECRET = '5A7N6DT0EtaifrDursiAUm8UmLp4vcUs',
  ACCESS_TOKEN_TIME = '6h',
  REFRESH_TOKEN_SECRET = '5A7N6DT0EtaifrDursiAUm8UmLp4vcUs',
  REFRESH_TOKEN_TIME = '30d',
  CRYPT_SALT = '$2b$12$vEfb2wrvSbV3mj8RsHoctu',
  DB_HOST = 'localhost',
  DB_PORT = 5432,
  DB_USER = 'postgres',
  DB_PASSWORD = 'admin',
  DB_DATABASE = 'dev',
} = process.env;
