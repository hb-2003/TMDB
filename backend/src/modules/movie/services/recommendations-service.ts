import { get } from "http";
import Movie from "../../../schema/models/movie";
import CustomGraphqlError from "../../../shared-lib/errors";
import {
  GetMovieRecommendationsResponse,
  IMovie,
  MovieList,
  DateRange,
} from "../../../utils/types";
import { getMessage } from "../../../utils/message";
import Titles from "../../../schema/models/titles";
import Country from "../../../schema/models/country";

export const recommendationsService = async (
  movieId: number,
  page: number = 1,
  language: string = "en-US"
): Promise<MovieList> => {
  try {
    if (movieId == null || movieId == undefined) {
      throw new CustomGraphqlError(
        getMessage("MOVIE_ID_REQUIRED"),
        "MOVIE_ID_REQUIRED"
      );
    }
    const movie: Movie | null = await Movie.findOne({ where: { id: movieId } });
    if (!movie)
      throw new CustomGraphqlError(
        getMessage("MOVIE_NOT_FOUND"),
        "MOVIE_NOT_FOUND"
      );

    const genre_ids: number[] = movie.genre_ids;

    const recommendations: Movie[] = await Movie.findAll({
      where: {
        genre_ids: genre_ids,
      },
      limit: 20,
      offset: (page - 1) * 20,
    });

    const total_results: number = await Movie.count({
      where: {
        genre_ids: genre_ids,
      },
    });

    const titles: Titles[] = await Titles.findAll({
      where: {
        movie_tv_id: movieId,
      },
    });

    const country: Country[] = await Country.findAll();

    const CountryId: string | undefined = country.find(
      (country: Country) => country.iso_3166_1 === language.split("-")[1]
    )?.id;

    const results: IMovie[] = recommendations.map((movie: Movie) => {
      return {
        id: movie.id,
        title: movie.title,
        original_title:
          titles.find((title: Titles) => title.country_id === CountryId)
            ?.title || movie.original_title,
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
        release_date: movie.release_date
          ? movie.release_date.toISOString()
          : undefined,
        imdb_id: movie.imdb_id,
        budget: movie.budget,
        revenue: movie.revenue,
        runtime: movie.runtime,
        status: movie.status,
        tagline: movie.tagline,
        homepage: movie.homepage,
        youtube_key: movie.youtube_key,
      };
    });
    const dates: DateRange = {
      maximum: results[0].release_date?.toString() || "",
      minimum: results[results.length - 1].release_date?.toString() || "",
    };

    const response: MovieList = {
      dates,
      page: page,
      total_results: total_results,
      total_pages: Math.ceil(total_results / 20),
      results: results,
    };

    return response;
  } catch (err) {
    throw err;
  }
};
