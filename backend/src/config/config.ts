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
  SALTING_ROUNDS: process.env.SALTING_ROUNDS,
  EMAIL_CONFIG: {
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },
  CLIENT_URL: process.env.CLIENT_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
};
