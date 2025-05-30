
import { resetPasswordVerifyService } from "../../services";
import { ResetPasswordVerifyResponse } from "../../../../utils/types";

export const resetPasswordVerify = async (
  _: unknown,
  { token }: { token: string }
): Promise<ResetPasswordVerifyResponse> => {
  try {
    const response: ResetPasswordVerifyResponse =
      await resetPasswordVerifyService(token);
    return response;
  } catch (error) {
    throw error;
  }
};
