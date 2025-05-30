import { GetTvShowAccountStatesResponse } from "../../../../utils/types";

import { accountStatesService } from "../../services";
import User from "../../../../schema/models/user";
import CustomGraphqlError from "../../../../shared-lib/errors";
import { getMessage } from "../../../../utils/message";

export const SeriesAccountStates = async (
  _: any,
  { id }: { id: number },
  context: { req: { user: User } }
): Promise<GetTvShowAccountStatesResponse> => {
  try {
    const userId = context.req.user.dataValues.id;
    if (typeof userId !== "string") {
      throw new CustomGraphqlError(getMessage("USER_NOT_FOUND"), "USER_NOT_FOUND");
    }
    return await accountStatesService(id, userId);
  } catch (error) {
    throw error;
  }
};
