import Movie from "../../../../schema/models/movie";
import Series from "../../../../schema/models/series";
import User from "../../../../schema/models/user";
import UserWatchlist from "../../../../schema/models/user_watchlist";
import { WatchListDetails, WatchListResponse } from "../../../../utils/types";
import { UserWatchlistService, watchlistService } from "../../services";

export const watchlist = async (
  _: unknown,
  { page, language, media_type }: { page: number, language: string, media_type: string },
  context: { req: { user: User } }
): Promise<WatchListResponse> => {
  try {
    
    return watchlistService(context.req.user, page, media_type);
  } catch (error) {
    throw error;
  }
};
