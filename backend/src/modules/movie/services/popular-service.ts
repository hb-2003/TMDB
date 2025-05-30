import Movie from "../../../schema/models/movie";
import CustomGraphqlError from "../../../shared-lib/errors";
import { MovieList, IMovie, DateRange } from "../../../utils/types";
import { getMessage } from "../../../utils/message";
import Titles from "../../../schema/models/titles";

export const popularService = async (
  page: number = 1,
  language: string = "en-US"
): Promise<MovieList> => {
  try {
    if (page == null) {
      throw new CustomGraphqlError(
        getMessage("PAGE_NOT_NULL"),
        "PAGE_NOT_NULL"
      );
    }
    const limit: number = 20;
    const skip: number = (page - 1) * limit;
    const movies: Movie[] = await Movie.findAll({
      limit,
      offset: skip,
      order: [["popularity", "DESC"]],
    });
    if (movies.length === 0) {
      return {
        dates: {
          minimum: "",
          maximum: "",
        },
        page: 1,
        total_results: 0,
        total_pages: 0,
        results: [],
      };
    }
    const totalCount: number = await Movie.count();

    const newList: IMovie[] = await Promise.all(
      movies.map(async (movie): Promise<IMovie> => {
        const title = await Titles.findOne({
          where: { movie_tv_id: movie.id },
        });
        return {
          id: movie.id,
          title: movie.title,
          original_title: title?.title ?? movie.original_title,
          overview: movie.overview,
          genre_ids: movie.genre_ids,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          popularity: movie.popularity,
          adult: movie.adult,
          original_language: movie.original_language,
          poster_path: movie.poster_path ?? "",
          backdrop_path: movie.backdrop_path ?? "",
          video: movie.video,
          release_date: movie.release_date?.toISOString(),
          imdb_id: movie.imdb_id,
          budget: movie.budget,
          revenue: movie.revenue,
          runtime: movie.runtime,
          status: movie.status,
          tagline: movie.tagline,
          homepage: movie.homepage,
          youtube_key: movie.youtube_key,
        };
      })
    );

    const dates: DateRange = {
      maximum:
        movies[movies.length - 1]?.release_date?.toISOString().split("T")[0] ??
        "",
      minimum: movies[0]?.release_date?.toISOString().split("T")[0] ?? "",
    };
    return {
      dates,
      page,
      total_pages: Math.ceil(totalCount / limit),
      total_results: totalCount,
      results: newList,
    };
  } catch (error) {
    throw error;
  }
};
