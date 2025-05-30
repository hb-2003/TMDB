import User, { IUser } from "../../../schema/models/user";
import CustomGraphqlError from "../../../shared-lib/errors";
import { hashPassword, tokenVerifier } from "../../../utils/helpers";
import { getMessage } from "../../../utils/message";
import {
  payload,
  ResetPasswordUpdateInput,
  Response,
} from "../../../utils/types";


export const resetPasswordUpdateService = async ({
  input,
}: {
  input: ResetPasswordUpdateInput;
}): Promise<Response> => {
  try {
    const { username, password, confirmPassword, token } = input;

    if (!username || !password || !confirmPassword || !token) {
      throw new CustomGraphqlError(getMessage("INVALID_INPUT"), "INVALID_INPUT");
    }

    if (password !== confirmPassword) {
      throw new CustomGraphqlError(getMessage("PASSWORD_MISMATCH"), "PASSWORD_MISMATCH");
    }

    const isTokenValid: payload | string = tokenVerifier(token) as payload;
    if (typeof isTokenValid === "string") {
      throw new CustomGraphqlError(getMessage("INVALID_TOKEN"), "INVALID_TOKEN");
    }
    const userExists: IUser | null = await User.findOne({
      where: { username, email: isTokenValid.email },
    });

    if (!userExists) {
      throw new CustomGraphqlError(getMessage("USER_NOT_FOUND"), "USER_NOT_FOUND");
    }

    const hashedPassword: string | undefined = await hashPassword(password);
    if (!hashedPassword) {
      throw new CustomGraphqlError(getMessage("PASSWORD_HASH_FAILED"), "PASSWORD_HASH_FAILED");
    }
    if (userExists.password === hashedPassword) {
      throw new CustomGraphqlError(getMessage("SAME_PASSWORD"), "SAME_PASSWORD");
    }
    userExists.password = hashedPassword;
    await userExists.save();

    return { message: "Password updated successfully.", status: true };
  } catch (error) {
    throw error;
  }
};
