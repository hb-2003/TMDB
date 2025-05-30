import { GetMovieAccountStatesResponse } from "../../../../utils/types";

import { accountStatesService } from "../../../movie/services";
import User from "../../../../schema/models/user";
import CustomGraphqlError from "../../../../shared-lib/errors";
import { getMessage } from "../../../../utils/message";

export const movieAccountStates = async (
  _: any,
  { id }: { id: number },
  context: { req: { user: User } }
): Promise<GetMovieAccountStatesResponse> => {
  try {
    const userId = context.req.user.dataValues.id;
    if (typeof userId !== "string") {
      throw new CustomGraphqlError(getMessage("USER_NOT_FOUND"), "User not found");
    }
    return await accountStatesService(id, userId);
  } catch (error) {
    throw error;
  }
};
