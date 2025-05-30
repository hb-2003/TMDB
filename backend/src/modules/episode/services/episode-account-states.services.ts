import { GetEpisodeAccountStatesResponse } from "../../../utils/types";
import UserWatchlist from "../../../schema/models/user_watchlist";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import Episode from "../../../schema/models/episodes";

export const episodeAccountStatesService = async (
  id: number,
  user_id: string
): Promise<GetEpisodeAccountStatesResponse> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("EPISODE_ID_NOT_FOUND"), "EPISODE_ID_NOT_FOUND");
    }
    if (!user_id) {
      throw new CustomGraphqlError(getMessage("USER_ID_NOT_FOUND"), "USER_ID_NOT_FOUND");
    }
    const episode: Episode | null = await Episode.findOne({
      where: {
        id: id,
      },
    });
    if (!episode) {
      throw new CustomGraphqlError(getMessage("EPISODE_NOT_FOUND"), "EPISODE_NOT_FOUND");
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
