import { refreshTokenThrowAccessTokenService } from "../../services";

export const refreshTokenThrowAccessToken = async (
  _: unknown,
  { token }: { token: string }
): Promise<string> => {
  try {
    return refreshTokenThrowAccessTokenService(token);
  } catch (error) {
    throw error;
  }
};
