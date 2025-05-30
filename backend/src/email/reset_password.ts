import { Config } from "../config/config";
import { emailTemplate } from "./layout";
import { emailSender } from "../utils/helpers";

export const resetPasswordEmail = async (email: string, token: string) => {
  const url: string = `${Config.CLIENT_URL}/reset-password?token=${token}`;
  const subject: string = "Reset Password";
  const content: string = `<div>
      <h3>Reset your password</h3>
      <p>Click the link below to reset your password</p>
      <a href="${url}">Reset Password</a>
    </div>`;
  const text: string = await emailTemplate("Reset Password", content);
  return emailSender(email, subject, text);
};
