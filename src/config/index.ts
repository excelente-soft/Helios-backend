import { config } from 'dotenv';
config({ path: '.env' });

export const { PORT = 5000, VERSION = 1 } = process.env;
