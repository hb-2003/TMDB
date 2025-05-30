import User from "../../../../schema/models/user";
import CustomGraphqlError from "../../../../shared-lib/errors";
import { getMessage } from "../../../../utils/message";
import { UserWatchlistService } from "../../services";
export const userWatchlist = async (
  _: unknown,
  { movie_id, value,media_type }: { movie_id: number; value: boolean, media_type: "movie" | "tv" },
  context: { req: { user: User } }
): Promise<boolean> => {
  try {
    if (value === null || movie_id === null) {
      throw new CustomGraphqlError(
        getMessage("VALUE_NOT_NULL"),
        "VALUE_NOT_NULL"
      );
    }
    return UserWatchlistService(context.req.user.id, movie_id, value, media_type);
  } catch (error) {
    throw error;
  }
};
