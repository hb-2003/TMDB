import User, { IUser } from "../../../schema/models/user";
import jwt from "jsonwebtoken";
import { Config } from "../../../config/config";
import { EmailVerificationResponse } from "../../../utils/types";
import AccessToken from "../../../schema/models/accessToken";
import { tokenGenerator } from "../../../utils/helpers";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const verifyEmailService = async (
  token: string
): Promise<EmailVerificationResponse> => {
  try {
    if (!Config.JWT_SECRET)
      throw new CustomGraphqlError(
        getMessage("JWT_SECRET_NOT_FOUND"),
        "JWT_SECRET_NOT_FOUND"
      );

    const decoded = jwt.verify(token, Config.JWT_SECRET) as { email: string };
    if (!decoded || !decoded.email)
      throw new CustomGraphqlError(
        getMessage("INVALID_TOKEN"),
        "INVALID_TOKEN"
      );

    const user: IUser | null = await User.findOne({
      where: { email: decoded.email },
    });
    if (!user)
      throw new CustomGraphqlError(
        getMessage("USER_NOT_FOUND"),
        "USER_NOT_FOUND"
      );
    if (user.emailVerified)
      throw new CustomGraphqlError(
        getMessage("EMAIL_ALREADY_VERIFIED"),
        "EMAIL_ALREADY_VERIFIED"
      );

    user.emailVerified = true;

    user.refreshtoken = await tokenGenerator(user.email, "1y");

    await user.save();

    let userToken: AccessToken | null = await AccessToken.findOne({
      where: { userId: user.id },
    });
    if (userToken) {
      try {
        jwt.verify(userToken.token, Config.JWT_SECRET);
      } catch (err) {
        if (
          err instanceof Error &&
          (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError")
        ) {
          userToken.token = await tokenGenerator(user.email);
          await userToken.save();
        }
      }
    } else {
      const generatedToken: string = await tokenGenerator(user.email);
      userToken = new AccessToken({ userId: user.id, token: generatedToken });
      await userToken.save();
    }

    return {
      message: "Email verified successfully",
      status: true,
      token: userToken.token,
    };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new CustomGraphqlError(
        getMessage("INVALID_TOKEN"),
        "INVALID_TOKEN"
      );
    }
    throw error;
  }
};
