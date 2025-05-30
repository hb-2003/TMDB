
import { sendVerificationEmailService } from "../../services";
import { Response } from "../../../../utils/types";
import CustomGraphqlError from "../../../../shared-lib/errors";
import { getMessage } from "../../../../utils/message";

export const sendVerificationEmail = async (
  _: unknown,
  { input: { email } }: { input: { email: string } }
): Promise<Response> => {
  try {
    if (!email) {
      throw new CustomGraphqlError(getMessage("INVALID_INPUT"), "INVALID_INPUT");
    }

    return await sendVerificationEmailService(email);
  } catch (error) {
    throw error;
  }
};
