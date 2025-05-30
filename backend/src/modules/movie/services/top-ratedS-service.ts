import Movie from "../../../schema/models/movie";
import CustomGraphqlError from "../../../shared-lib/errors";
import { IMovie, MovieList, DateRange } from "../../../utils/types";
import { getMessage } from "../../../utils/message";
import Titles from "../../../schema/models/titles";
import Country from "../../../schema/models/country";
import UserWatchlist from "../../../schema/models/user_watchlist";
import { Op } from "sequelize";

export const topRatedService = async (page: number, language: string): Promise<MovieList> => {
  try {
    if (page == null || page == undefined) {
      throw new CustomGraphqlError(getMessage("PAGE_NOT_NULL"), "PAGE_NOT_NULL");
    }
    let movies: Movie[] = [];

    const userWatchlist: UserWatchlist[] = await UserWatchlist.findAll({ where: { rated: 1, media_type: "movie" } });
    if (userWatchlist.length === 0) {
      const movies_ids: number[] = userWatchlist.map((movie: UserWatchlist) => movie.media_id);
      let movies: Movie[] = await Movie.findAll({
        where: {
          vote_average: { [Op.gte]: 7 },
          ...(movies_ids.length >= 20 && { id: { [Op.notIn]: movies_ids } })
        },
        limit: 20 * page,
        order: [["vote_average", "DESC"]]
      });
    }

    if (movies.length === 0) {
      movies = await Movie.findAll({
        where: {
          vote_average: { [Op.gte]: 7 }
        },
        limit: 20 * page,
        order: [["vote_average", "DESC"]]
      });
    }
    const country: Country[] = await Country.findAll();
    const CountryId: string | undefined = country.find((c: Country) => c.iso_3166_1 === language.split("-")[1])?.id;

    const results: IMovie[] = await Promise.all(movies.map(async (movie: Movie): Promise<IMovie> => {
      const title: Titles | null = await Titles.findOne({
        where: { movie_tv_id: movie.id, country_id: CountryId }
      });

      return {
        id: movie.id,
        title: title?.title || movie.title,
        original_title: movie.original_title,
        overview: title?.title || movie.overview,
        genre_ids: movie.genre_ids,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        popularity: movie.popularity,
        adult: movie.adult,
        original_language: movie.original_language,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        video: movie.video,
        release_date: movie.release_date ? movie.release_date.toISOString() : undefined,
        imdb_id: movie.imdb_id,
        budget: movie.budget,
        revenue: movie.revenue,
        runtime: movie.runtime,
        status: movie.status,
        tagline: movie.tagline,
        homepage: movie.homepage,
        youtube_key: movie.youtube_key
      };
    }));

    const dates: DateRange = {
      maximum: movies.length && movies[0].release_date ? movies[0].release_date.toISOString() : "",
      minimum: movies.length && movies[movies.length - 1].release_date ? movies[movies.length - 1].release_date?.toISOString() || "" : ""
    };

    return {
      dates,
      page,
      total_pages: 1,
      total_results: movies.length,
      results
    };
  } catch (error) {
    throw new CustomGraphqlError(
      getMessage("INTERNAL_SERVER_ERROR"),
      "INTERNAL_SERVER_ERROR"
    );
  }
};
