import User, { IUser } from "../../../schema/models/user";
import { hashPassword, verificationUrl } from "../../../utils/helpers";
import { emailVerification } from "../../../email/email_verification";
import { RegisterInput, Response } from "../../../utils/types";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import rateLimiter from "../../../utils/rateLimiter";
import { validatePasswordStrength, sanitizeInput } from "../../../utils/helpers";

export const registerService = async (
  _: unknown,
  { input }: { input: RegisterInput }
): Promise<Response> => {
  const { username, email, password, confirmPassword } = input;

  // Input sanitization
  const sanitizedUsername = sanitizeInput(username);
  const sanitizedEmail = sanitizeInput(email);

  // Rate limiting
  await rateLimiter.check(sanitizedEmail);

  if (!sanitizedUsername || !sanitizedEmail || !password || !confirmPassword) {
    throw new CustomGraphqlError(getMessage("All_FIELDS_REQUIRED"), "All_FIELDS_REQUIRED");
  }

  if (!sanitizedEmail.includes("@")) {
    throw new CustomGraphqlError(getMessage("INVALID_EMAIL"), "INVALID_EMAIL");
  }

  if (password !== confirmPassword) {
    throw new CustomGraphqlError(getMessage("PASSWORD_MISMATCH"), "PASSWORD_MISMATCH");
  }

  // Password strength validation
  if (!validatePasswordStrength(password)) {
    throw new CustomGraphqlError(getMessage("WEAK_PASSWORD"), "WEAK_PASSWORD");
  }

  const [userExists, usernameExists] = await Promise.all([
    User.findOne({ where: { email: sanitizedEmail } }),
    User.findOne({ where: { username: sanitizedUsername } }),
  ]);

  if (userExists) {
    throw new CustomGraphqlError(getMessage("EMAIL_ALREADY_EXISTS"), "EMAIL_ALREADY_EXISTS");
  }

  if (usernameExists) {
    throw new CustomGraphqlError(getMessage("USERNAME_ALREADY_EXISTS"), "USERNAME_ALREADY_EXISTS");
  }

  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) {
    throw new CustomGraphqlError(getMessage("PASSWORD_HASH_FAILED"), "PASSWORD_HASH_FAILED");
  }

  const newUser: IUser = new User({
    username: sanitizedUsername,
    email: sanitizedEmail,
    password: hashedPassword,
  });

  await newUser.save();

  const url = await verificationUrl({ newUser });
  if (!url) {
    throw new CustomGraphqlError(getMessage("URL_GENERATION_FAILED"), "URL_GENERATION_FAILED");
  }

  await emailVerification(sanitizedEmail, url);

  return { message: "User registered successfully.", status: true };
};
