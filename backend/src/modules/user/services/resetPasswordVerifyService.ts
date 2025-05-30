import User, { IUser } from "../../../schema/models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Config } from "../../../config/config";
import { ResetPasswordVerifyResponse } from "../../../utils/types";

import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const resetPasswordVerifyService = async (
  token: string
): Promise<ResetPasswordVerifyResponse> => {
  try {
    if (!token) {
      throw new CustomGraphqlError(getMessage("INVALID_INPUT"), "INVALID_INPUT");
    }
    if (!Config.JWT_SECRET) {
      throw new CustomGraphqlError(getMessage("JWT_SECRET_NOT_FOUND"),"JWT_SECRET_NOT_FOUND");
    }

    let email: string | undefined;

    await jwt.verify(token, Config.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new CustomGraphqlError(getMessage("TOKEN_EXPIRED"),"TOKEN_EXPIRED");
        }
        throw new CustomGraphqlError(getMessage("INVALID_TOKEN"),"INVALID_TOKEN");
      }
      email = (decoded as JwtPayload).email;
    });

    if (!email) {
      throw new CustomGraphqlError(getMessage("INVALID_TOKEN"),"INVALID_TOKEN");
    }

    const user: IUser | null = await User.findOne({ where: { email } });
    if (!user) {
      throw new CustomGraphqlError(getMessage("USER_NOT_FOUND"), "USER_NOT_FOUND");
    }

    return {
      message: "Token verified successfully",
      status: true,
      username: user.username,
    };
  } catch (error) {
    throw error;
  }
};
