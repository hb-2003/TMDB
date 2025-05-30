import { comparePassword, tokenGenerator } from "../../../utils/helpers";

import User from "../../../schema/models/user";
import { LoginInput, LoginResponse } from "../../../utils/types";
import { Config } from "../../../config/config";
import AccessToken from "../../../schema/models/accessToken";
import jwt from "jsonwebtoken";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const loginService = async ({
  input,
}: {
  input: LoginInput;
}): Promise<LoginResponse> => {
  try {
    if (!Config.JWT_SECRET)
      throw new CustomGraphqlError(getMessage("JWT_SECRET_NOT_FOUND"));

    const { username, password } = input;
    if (!username || !password)
      throw new CustomGraphqlError(
        getMessage("INVALID_CREDENTIALS"),
        "INVALID_CREDENTIALS"
      );

    const user = await User.findOne({ where: { username } });
    if (!user)
      throw new CustomGraphqlError(
        getMessage("INVALID_CREDENTIALS"),
        "INVALID_CREDENTIALS"
      );

    if (user.emailVerified === false)
      throw new CustomGraphqlError(
        getMessage("EMAIL_NOT_VERIFIED"),
        "EMAIL_NOT_VERIFIED"
      );

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch)
      throw new CustomGraphqlError(
        getMessage("INVALID_CREDENTIALS"),
        "INVALID_CREDENTIALS"
      );

    let token: string = "";
    const accessToken = await AccessToken.findOne({
      where: { userId: user.id },
    });
    if (accessToken) {
      try {
        jwt.verify(accessToken.token, Config.JWT_SECRET);
        token = accessToken.token;
      } catch (err) {
        if (err instanceof Error && err.name === "TokenExpiredError") {
          token = tokenGenerator(user.email);
          await AccessToken.update({ token }, { where: { userId: user.id } });
        } else {
          throw new CustomGraphqlError(
            getMessage("INVALID_TOKEN"),
            "INVALID_TOKEN"
          );
        }
      }
    } else {
      token = tokenGenerator(user.email);
      await new AccessToken({ userId: user.id, token }).save();
    }

    return { token, user };
  } catch (error) {
    throw error;
  }
};
