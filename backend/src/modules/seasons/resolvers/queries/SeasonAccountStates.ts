import { GetTvShowAccountStatesResponse } from "../../../../utils/types";

import { SeasonAccountStatesService } from "../../services";
import User from "../../../../schema/models/user";
import CustomGraphqlError from "../../../../shared-lib/errors";
import { getMessage } from "../../../../utils/message";

export const SeasonAccountStates = async (
  _: any,
  { id, season_number }: { id: number, season_number: number },
  context: { req: { user: User } }
): Promise<GetTvShowAccountStatesResponse> => {
  try {
    const userId = context.req.user.dataValues.id;
    if (typeof userId !== "string") {
      throw new CustomGraphqlError(getMessage("USER_NOT_FOUND"), "USER_NOT_FOUND");
    }
    return await SeasonAccountStatesService(id,season_number,userId);
  } catch (error) {
    throw error;
  }
};
