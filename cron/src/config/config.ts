import dotenv from "dotenv";

dotenv.config();
export const Config = {
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  API_KEY: process.env.API_KEY,
  DB_CONFIG: {
    DATA_BASE_URL: process.env.DATA_BASE_URL,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
  },
  NODE_ENV: process.env.NODE_ENV,
  CRON_SCHEDULE: process.env.CRON_SCHEDULE,
};
