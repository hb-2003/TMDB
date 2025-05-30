import { Response, ResetPasswordUpdateInput } from "../../../../utils/types";
import { resetPasswordUpdateService } from "../../services";

export const resetPasswordUpdate = async (
  _: unknown,
  { input }: { input: ResetPasswordUpdateInput }
): Promise<Response> => {
  try {
    return await resetPasswordUpdateService({ input });
  } catch (error) {
    throw error;
  }
};
