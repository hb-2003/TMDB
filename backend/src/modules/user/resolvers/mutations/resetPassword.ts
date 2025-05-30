import { resetPasswordService } from "../../services";
import { Response, ResetPasswordInput } from "../../../../utils/types";

import CustomGraphqlError from "../../../../shared-lib/errors";
import { getMessage } from "../../../../utils/message";

export const resetPassword = async (
  _: unknown,
  { input }: { input: ResetPasswordInput }
): Promise<Response> => {
  try {
    const { email } = input;

    if (!email) {
      throw new CustomGraphqlError(getMessage("EMAIL_REQUIRED"), "EMAIL_REQUIRED");
    }

    return await resetPasswordService(email);
  } catch (error) {
    throw error;
  }
};
