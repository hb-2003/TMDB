import { get } from "http";
import { emailVerification } from "../../../email/email_verification";
import User, { IUser } from "../../../schema/models/user";
import CustomGraphqlError from "../../../shared-lib/errors";
import { verificationUrl } from "../../../utils/helpers";
import { Response } from "../../../utils/types";
import { getMessage } from "../../../utils/message";


export const sendVerificationEmailService = async (
  email: string
): Promise<Response> => {
  try {
    const existsUser: IUser | null = await User.findOne({ where: { email } });
    if (!existsUser) {
      throw new CustomGraphqlError(getMessage("USER_NOT_FOUND"), "USER_NOT_FOUND");
    }

    if (existsUser.emailVerified) {
      throw new CustomGraphqlError(getMessage("EMAIL_ALREADY_VERIFIED"), "EMAIL_ALREADY_VERIFIED");
    }

    const url: string | undefined = await verificationUrl({
      newUser: existsUser,
    });
    if (!url) {
      throw new CustomGraphqlError(getMessage("URL_GENERATION_FAILED"), "URL_GENERATION_FAILED");
    }

    await emailVerification(email, url);
    return {
      message: "Verification email sent successfully",
      status: true,
    };
  } catch (error) {
    throw error;
  }
};
