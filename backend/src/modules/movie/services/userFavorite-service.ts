import UserWatchlist from "../../../schema/models/user_watchlist";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { getMovie, getSeries } from "../../helper";

export const userFavoriteService = async (
  userId: string,
  id: number,
  value: boolean,
  media_type: "movie" | "tv"
): Promise<boolean> => {
  try {
    if (!userId) {
      throw new CustomGraphqlError(getMessage("USER_ID_REQUIRED"), "USER_ID_REQUIRED");
    }
    if (!media_type) {
      throw new CustomGraphqlError(getMessage("MEDIA_TYPE_REQUIRED"), "MEDIA_TYPE_REQUIRED");
    }
    if (media_type !== "movie" && media_type !== "tv") {
      throw new CustomGraphqlError(getMessage("INVALID_MEDIA_TYPE"), "INVALID_MEDIA_TYPE");
    }

    const mediaExists = media_type === "movie" ? await getMovie(id) : await getSeries(id);
    if (!mediaExists) {
      throw new CustomGraphqlError(getMessage("MEDIA_NOT_FOUND"), "MEDIA_NOT_FOUND");
    }

    const existingEntry = await UserWatchlist.findOne({
      where: { user_id: userId, media_id: id, media_type }
    });

    if (existingEntry) {
      await UserWatchlist.update(
        { favorite: value },
        { where: { user_id: userId, media_id: id, media_type } }
      );
    } else {
      await UserWatchlist.create({
        user_id: userId,
        media_id: id,
        media_type,
        favorite: value,
      });
    }

    return true;
  } catch (error) {
    throw error;
  }
};
