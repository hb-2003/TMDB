import User, { IUser } from "../../../schema/models/user";
import { Response } from "../../../utils/types";
import { resetPasswordTokenGenerator } from "../../../utils/helpers";

import { resetPasswordEmail } from "../../../email/reset_password";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const resetPasswordService = async (
  email: string
): Promise<Response> => {
  try {
    const user: IUser | null = await User.findOne({ where: { email } });
    if (!user) {
      throw new CustomGraphqlError(
        getMessage("USER_NOT_FOUND"),
        "USER_NOT_FOUND"
      );
    }
    if (user.emailVerified === false) {
      throw new CustomGraphqlError(
        getMessage("EMAIL_NOT_VERIFIED"),
        "EMAIL_NOT_VERIFIED"
      );
    }

    const token: string = await resetPasswordTokenGenerator(email);
    if (!token) {
      throw new CustomGraphqlError(
        getMessage("TOKEN_GENERATION_FAILED"),
        "TOKEN_GENERATION_FAILED"
      );
    }

    await resetPasswordEmail(email, token);

    return {
      message: "Password reset link sent to your email.",
      status: true,
    };
  } catch (error: unknown) {
    throw error;
  }
};
