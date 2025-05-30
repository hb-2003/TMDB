import Movie from "../../../schema/models/movie";
import Series from "../../../schema/models/series";
import User from "../../../schema/models/user";
import UserWatchlist from "../../../schema/models/user_watchlist";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { WatchListDetails, WatchListResponse } from "../../../utils/types";

const fetchWatchlistDetails = async (watchlist: UserWatchlist[]): Promise<WatchListDetails[]> => {
  return (
    await Promise.all(
      watchlist.map(async (item: UserWatchlist): Promise<WatchListDetails | undefined> => {
        if (item.media_type === "movie") {
          const movie: Movie | null = await Movie.findByPk(item.media_id);
          if (movie) {
            return {
              media_type: "movie",
              media_id: item.media_id,
              title: movie.title,
              poster_path: movie.poster_path ?? "",
              backdrop_path: movie.backdrop_path ?? "",
              release_date: movie.release_date?.toISOString() ?? "",
            };
          }
        } else {
          const series: Series | null = await Series.findByPk(item.media_id);
          if (series) {
            return {
              media_type: "tv",
              media_id: item.media_id,
              title: series.tagline,
              poster_path: series.poster_path ?? "",
              backdrop_path: series.backdrop_path ?? "",
              release_date: series.first_air_date?.toISOString() ?? "",
            };
          }
        }
      })
    )
  ).filter((item): item is WatchListDetails => item !== undefined);
};

export const watchlistService = async (
  user: User,
  page: number,
  media_type: string
): Promise<WatchListResponse> => {
  if (page == null) {
    throw new CustomGraphqlError(getMessage("PAGE_NOT_FOUND"), "PAGE_NOT_FOUND");
  }

  const whereClause: any = { user_id: user.id, watchlist: true };
  if (media_type !== "all") whereClause.media_type = media_type;
  console.log(media_type)
  const watchlist: UserWatchlist[] = await UserWatchlist.findAll({
    where: whereClause,
    limit: 20,
    offset: (page - 1) * 20,
    attributes: ["media_id", "media_type"],
  });

  const totalWatchlist: number = await UserWatchlist.count({ where: whereClause });
  const watchlistListDetails: WatchListDetails[] = await fetchWatchlistDetails(watchlist);

  const totalPages: number = Math.ceil(totalWatchlist / 20);
  return {
    page,
    total_results: totalWatchlist,
    total_pages: totalPages,
    results: watchlistListDetails,
  };
};
