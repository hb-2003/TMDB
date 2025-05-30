import { Config } from "../config/config";
import { emailTemplate } from "./layout";
import { emailSender } from "../utils/helpers";
export const emailVerification = async (email: string, token: string) => {
  const url: string = `${Config.CLIENT_URL}/verify-email?token=${token}`;

  const subject: string = "Email Verification";
  const content: string = `<div>
      <h3>Verify your email address</h3>
      <p>Click the link below to verify your email address</p>
      <a href="${url}">Verify Email</a>
    </div>`;
  const text: string = await emailTemplate("Email Verification", content);
  return emailSender(email, subject, text);
};
