import { LoginInput, LoginResponse } from "../../../../utils/types";
import { loginService } from "../../services";

export const login = async (
  _: unknown,
  { input }: { input: LoginInput }
): Promise<LoginResponse> => {
  try {
    return await loginService({ input });
  } catch (error) {
    throw error;
  }
};
