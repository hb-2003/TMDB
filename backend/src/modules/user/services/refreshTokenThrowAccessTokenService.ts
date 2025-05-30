import User from "../../../schema/models/user";
import jwt from "jsonwebtoken";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { tokenGenerator } from "../../../utils/helpers";
import AccessToken from "../../../schema/models/accessToken";
import { Config } from "../../../config/config";

export const refreshTokenThrowAccessTokenService = async (
  refreshToken: string
): Promise<string> => {
  if (!Config.JWT_SECRET) {
    throw new CustomGraphqlError(
      getMessage("JWT_SECRET_NOT_FOUND"),
      "JWT_SECRET_NOT_FOUND"
    );
  }

  let email: string;
  try {
    const decodedToken = jwt.verify(refreshToken, Config.JWT_SECRET) as jwt.JwtPayload;
    email = decodedToken.email as string;
  } catch (error) {
    const errorMessage = error instanceof jwt.TokenExpiredError
      ? "REFRESH_TOKEN_EXPIRED"
      : "INVALID_REFRESH_TOKEN";
    throw new CustomGraphqlError(getMessage(errorMessage), errorMessage);
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new CustomGraphqlError(getMessage("USER_NOT_FOUND"), "USER_NOT_FOUND");
  }

  let accessToken = await AccessToken.findOne({ where: { userId: user.id } });
  if (accessToken) {
    try {
      jwt.verify(accessToken.token, Config.JWT_SECRET);
    } catch {
      accessToken.token = tokenGenerator(user.email);
      await accessToken.save();
    }
  } else {
    accessToken = await AccessToken.create({
      userId: user.id,
      token: tokenGenerator(user.email),
    });
  }

  return accessToken.token;
};
