import {
  NowPlayingFilter,
  SortBy,
  MovieList,
  IMovie,
  DateRange,
} from "../../../utils/types";
import Movie from "../../../schema/models/movie";
import Titles from "../../../schema/models/titles";
import sequelize, { Op, QueryTypes, WhereOptions } from "sequelize";
import { getSortBy } from "../../../utils/helpers";
import db from "../../../utils/sequelize-client";

export const nowPlayingService = async (
  filter: NowPlayingFilter
): Promise<MovieList> => {
  try {
    const {
      page,
      limitValue,
      skip,
      sort_by,
      release_date_gte,
      release_date_lte,
      release_type,
    } = await prepareFilterParams(filter);

    const query: WhereOptions = buildQuery({ release_date_gte, release_date_lte });
    const { column, order } = getSortBy(sort_by);

    const { movies, totalCount } = await fetchMovies({
      query,
      limit: limitValue,
      skip,
      column,
      order,
      release_type,
      release_date_gte,
      release_date_lte,
    });

    const results: IMovie[] = await Promise.all(
      movies.map(async (movie): Promise<IMovie> => {
        const title: Titles | null = await Titles.findOne({
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
        } as IMovie;
      })
    );

    const dates: DateRange = {
      maximum: movies[movies.length - 1]?.release_date?.toISOString().split("T")[0] ?? "",
      minimum: movies[0]?.release_date?.toISOString().split("T")[0] ?? "",
    };

    return {
      dates,
      page,
      total_pages: Math.ceil(totalCount / limitValue),
      total_results: totalCount,
      results,
    };
  } catch (error) {
    throw error;
  }
};

const prepareFilterParams = async (filter: NowPlayingFilter): Promise<{
  page: number;
  limitValue: number;
  skip: number;
  sort_by: SortBy;
  release_date_gte: string;
  release_date_lte: string;
  release_type: number;
}> => {
  const page: number = filter.page ?? 1;
  const limitValue: number = 20;
  const skip: number = (page - 1) * limitValue;
  const sort_by: SortBy = SortBy.POPULARITY_DESC;
  const release_date_gte: string = filter.release_date_gte ?? new Date((await Movie.min("release_date")) as string).toISOString().split("T")[0];
  const release_date_lte: string = filter.release_date_lte ?? new Date((await Movie.max("release_date")) as string).toISOString().split("T")[0];
  const release_type: number = 2;

  return {
    page,
    limitValue,
    skip,
    sort_by,
    release_date_gte,
    release_date_lte,
    release_type,
  };
};

const buildQuery = (filter: {
  release_date_gte: string;
  release_date_lte: string;
}): WhereOptions => ({
  release_date: {
    [Op.gte]: filter.release_date_gte,
    [Op.lte]: filter.release_date_lte,
  },
});

const fetchMovies = async ({
  query,
  limit,
  skip,
  column,
  order,
  release_type,
  release_date_gte,
  release_date_lte,
}: {
  query: WhereOptions;
  limit: number;
  skip: number;
  column: string;
  order: string;
  release_type: number;
  release_date_gte: string;
  release_date_lte: string;
}): Promise<{ movies: Movie[]; totalCount: number }> => {
  try {
    const movies: Movie[] = await db.sequelize.query<Movie>(
      `SELECT movies.*
       FROM public.movies
       WHERE movies.release_date BETWEEN :release_date_gte AND :release_date_lte
       AND EXISTS (
       SELECT 1
       FROM public.release_dates
       WHERE release_dates.movie_id = movies.id
       AND release_dates.type = :release_type order by popularity desc
       )
       ORDER BY ${column} ${order}
       LIMIT :limit OFFSET :skip`,
      {
        replacements: {
          release_type,
          release_date_gte,
          release_date_lte,
          limit,
          skip,
        },
        type: QueryTypes.SELECT,
      }
    );

    const countResult: { count: number }[] = await db.sequelize.query(
      `SELECT COUNT(movies.id) as count
       FROM public.movies
       WHERE movies.release_date BETWEEN :release_date_gte AND :release_date_lte
       AND EXISTS (
       SELECT 1
       FROM public.release_dates
       WHERE release_dates.movie_id = movies.id
       AND release_dates.type = :release_type
       )`,
      {
        replacements: { release_type, release_date_gte, release_date_lte },
        type: QueryTypes.SELECT,
      }
    );

    return {
      movies: movies as Movie[],
      totalCount: (countResult[0] as { count: number }).count,
    };
  } catch {
    return { movies: [], totalCount: 0 };
  }
};

export const emptyMovieList = (page: number = 1): MovieList => ({
  dates: { maximum: "", minimum: "" },
  page,
  total_results: 0,
  total_pages: 0,
  results: [],
});
