import { config } from 'dotenv';
config({ path: '.env' });

export const {
  PORT = 5000,
  VERSION = 1,
  DB_HOST = 'localhost',
  DB_PORT = 5432,
  DB_USER = 'postgres',
  DB_PASSWORD = 'admin',
  DB_DATABASE = 'dev',
} = process.env;
