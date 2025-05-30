import { GetTvShowAccountStatesResponse } from "../../../utils/types";
import UserWatchlist from "../../../schema/models/user_watchlist";
import Series from "../../../schema/models/series";
import { getSeries } from "../../helper";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const accountStatesService = async (
  id: number,
  user_id: string
): Promise<GetTvShowAccountStatesResponse> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("SERIES_ID_REQUIRED"), "SERIES_ID_REQUIRED");
    }
    if (!user_id) {
      throw new CustomGraphqlError(getMessage("USER_ID_NOT_FOUND"), "USER_ID_NOT_FOUND");
    }
    const series: Series | null = await getSeries(id);
    if (!series) {
      throw new CustomGraphqlError(
        getMessage("SERIES_NOT_FOUND"),
        "SERIES_NOT_FOUND"
      );
    }
    const watchlist: UserWatchlist | null = await UserWatchlist.findOne({
      where: {
        user_id: user_id,
        media_id: id,
        media_type: "tv",
      },
    });
    if (watchlist) {
      return {
        id: id,
        favorite: watchlist.favorite,
        rated: watchlist.rated ? { value: watchlist.rating } : { value: false },
        watchlist: watchlist.watchlist,
      };
    }
    return {
      id: id,
      favorite: false,
      rated: { value: false },
      watchlist: false,
    };
  } catch (error) {
    throw error;
  }
};
