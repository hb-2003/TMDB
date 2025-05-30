import bcrypt from "bcrypt";
import { Config } from "../config/config";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { VerificationUrlInput, payload, SortBy } from "./types";

import User from "../schema/models/user";
import CustomGraphqlError from "../shared-lib/errors";
import { getMessage } from "./message";
import { get } from "http";
import Review from "../schema/models/review";

const saltRounds = parseInt(Config.SALTING_ROUNDS || "");
const accessTokenExpires = Config.ACCESS_TOKEN_EXPIRY || "";
if (isNaN(saltRounds))
  throw new CustomGraphqlError(
    getMessage("INVALID_SALT_ROUNDS"),
    "INVALID_SALT_ROUNDS"
  );
export const validatePasswordStrength = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
export const sanitizeInput = (input: string): string => {
  return input.trim();
};

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new CustomGraphqlError(
      getMessage("ERROR_HASHING_PASSWORD"),
      "ERROR_HASHING_PASSWORD"
    );
  }
};

export const comparePassword = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new CustomGraphqlError(
      getMessage("ERROR_COMPARING_PASSWORD"),
      "ERROR_COMPARING_PASSWORD"
    );
  }
};

export const emailValidator = (email: string) => /\S+@\S+\.\S+/.test(email);

export const passwordValidator = (password: string) => password.length >= 8;

export const emailSender = async (
  email: string,
  subject: string,
  text: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: Config.EMAIL_CONFIG.EMAIL,
        pass: Config.EMAIL_CONFIG.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: Config.EMAIL_CONFIG.EMAIL,
      to: email,
      subject,
      html: text,
    });
    return true;
  } catch (error) {
    throw new CustomGraphqlError(
      getMessage("ERROR_SENDING_EMAIL"),
      "ERROR_SENDING_EMAIL"
    );
  }
};

export const verificationUrl = async ({
  newUser,
}: VerificationUrlInput): Promise<string | undefined> => {
  try {
    if (!Config.JWT_SECRET)
      throw new CustomGraphqlError(
        getMessage("JWT_SECRET_NOT_FOUND"),
        "JWT_SECRET_NOT_FOUND"
      );
    if (!newUser.email)
      throw new CustomGraphqlError(
        getMessage("EMAIL_NOT_FOUND"),
        "EMAIL_NOT_FOUND"
      );
    return tokenGenerator(newUser.email, "15m");
  } catch (error) {
    throw error;
    return undefined;
  }
};

export const tokenGenerator = (
  email: string,
  expiresIn: string = accessTokenExpires
): string => {
  try {
    if (!Config.JWT_SECRET)
      throw new CustomGraphqlError(
        getMessage("JWT_SECRET_NOT_FOUND"),
        "JWT_SECRET_NOT_FOUND"
      );
    return jwt.sign({ email }, Config.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw error;
    return "";
  }
};

export const resetPasswordTokenGenerator = (email: string): string => {
  try {
    if (!Config.JWT_SECRET)
      throw new CustomGraphqlError(
        getMessage("JWT_SECRET_NOT_FOUND"),
        "JWT_SECRET_NOT_FOUND"
      );
    return jwt.sign({ email }, Config.JWT_SECRET, { expiresIn: "15m" });
  } catch (error) {
    throw error;
    return "";
  }
};

export const tokenVerifier = (token: string): string | object => {
  try {
    if (!Config.JWT_SECRET)
      throw new CustomGraphqlError(
        getMessage("JWT_SECRET_NOT_FOUND"),
        "JWT_SECRET_NOT_FOUND"
      );
    return jwt.verify(token, Config.JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      throw new CustomGraphqlError(
        getMessage("TOKEN_EXPIRED"),
        "TOKEN_EXPIRED"
      );
    if (error instanceof jwt.JsonWebTokenError)
      throw new CustomGraphqlError(
        getMessage("INVALID_TOKEN"),
        "INVALID_TOKEN"
      );
    throw error;
  }
};

export const generateRefreshToken = async (email: string): Promise<string> => {
  try {
    return await tokenGenerator(email, "1y");
  } catch (error) {
    throw error;
  }
};

export const getUser = async (token: string) => {
  try {
    if (!Config.JWT_SECRET) {
      throw new CustomGraphqlError(
        getMessage("JWT_SECRET_NOT_FOUND"),
        "JWT_SECRET_NOT_FOUND"
      );
    }
    let decoded: payload | null = null;
    try {
      decoded = jwt.verify(token, Config.JWT_SECRET) as payload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new CustomGraphqlError(
          getMessage("TOKEN_EXPIRED"),
          "TOKEN_EXPIRED"
        );
      }
      throw new CustomGraphqlError(
        getMessage("INVALID_TOKEN"),
        "INVALID_TOKEN"
      );
    }
    const user: User | null = await User.findOne({
      where: { email: decoded.email },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getSortBy = (
  sortBy: SortBy
): { column: string; order: string } => {
  switch (sortBy) {
    case SortBy.POPULARITY_DESC:
      return { column: "popularity", order: "desc" };
    case SortBy.POPULARITY_ASC:
      return { column: "popularity", order: "asc" };
    case SortBy.RELEASE_DATE_DESC:
      return { column: "release_date", order: "desc" };
    case SortBy.RELEASE_DATE_ASC:
      return { column: "release_date", order: "asc" };
    case SortBy.VOTE_AVERAGE_DESC:
      return { column: "vote_average", order: "desc" };
    case SortBy.VOTE_AVERAGE_ASC:
      return { column: "vote_average", order: "asc" };
    case SortBy.TITLE_ASC:
      return { column: "title", order: "asc" };
    case SortBy.TITLE_DESC:
      return { column: "title", order: "desc" };
    default:
      return { column: "popularity", order: "desc" };
  }
};