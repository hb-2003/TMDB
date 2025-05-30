
import { EmailVerificationResponse } from "../../../../utils/types";
import { verifyEmailService } from "../../services";
import CustomGraphqlError from "../../../../shared-lib/errors";
import { getMessage } from "../../../../utils/message";

export const verifyEmail = async (
  _: unknown,
  { token }: { token: string }
): Promise<EmailVerificationResponse> => {
  if (!token) {
    throw new CustomGraphqlError(getMessage("INVALID_INPUT"), "INVALID_INPUT");
  }
  try {
    return await verifyEmailService(token);
  } catch (error) {
    throw error;
  }
};
