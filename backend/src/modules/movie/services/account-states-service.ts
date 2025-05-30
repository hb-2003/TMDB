import { GetMovieAccountStatesResponse } from "../../../utils/types";
import UserWatchlist from "../../../schema/models/user_watchlist";
import Movie from "../../../schema/models/movie";
import { getMovie } from "../../helper";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const accountStatesService = async (
  movieId: number,
  user_id: string
): Promise<GetMovieAccountStatesResponse> => {
  try {
    if(!movieId) {
      throw new CustomGraphqlError(getMessage("MOVIE_ID_NOT_FOUND"), "MOVIE_ID_NOT_FOUND");
    }
    if(!user_id) {
      throw new CustomGraphqlError(getMessage("USER_ID_NOT_FOUND"), "USER_ID_NOT_FOUND");
    }
    const movie: Movie | null = await getMovie(movieId);
    if (!movie) {
      throw new CustomGraphqlError(
        getMessage("MOVIE_NOT_FOUND"),
        "MOVIE_NOT_FOUND"
      );
    }
    const watchlist: UserWatchlist | null = await UserWatchlist.findOne({
      where: {
        user_id: user_id,
        media_id: movieId,
        media_type: "movie",
      },
    });

    if (watchlist) {
      return {
        id: movieId,
        favorite: watchlist.favorite,
        rated: watchlist.rated ? { value: watchlist.rating } : { value: false },
        watchlist: watchlist.watchlist,
      };
    }
    return {
      id: movieId,
      favorite: false,
      rated: { value: false },
      watchlist: false,
    };
  } catch (error) {
    throw error;
  }
};
