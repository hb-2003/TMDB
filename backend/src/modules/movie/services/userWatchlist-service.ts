import UserWatchlist from "../../../schema/models/user_watchlist";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { getMovie, getSeries } from "../../helper";

export const UserWatchlistService = async (
  userId: string,
  id: number,
  value: boolean,
  media_type: "movie" | "tv"
): Promise<boolean> => {
  try {
    if (value === null || id === null) {
      throw new CustomGraphqlError(
        getMessage("VALUE_NOT_NULL"),
        "VALUE_NOT_NULL"
      );
    }
    const media = media_type === "movie" ? await getMovie(id) : await getSeries(id);
    if (!media) {
      throw new CustomGraphqlError(
        getMessage("MEDIA_NOT_FOUND"),
        "MEDIA_NOT_FOUND"
      );
    }
    if (await UserWatchlist.findOne({ where: { user_id: userId, media_id: id } })) {
      await UserWatchlist.update({ watchlist: value }, { where: { user_id: userId, media_id: id } });
    } else {
      await UserWatchlist.create({ user_id: userId, media_id: id, media_type, watchlist: value });
    }
    return true;
  } catch (error) {
    throw error;
  }
}