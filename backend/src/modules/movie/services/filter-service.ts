import {
  Filter,
  SortBy,
  MovieList,
  IMovie,
  DateRange,
} from "../../../utils/types";
import Movie from "../../../schema/models/movie";
import Country from "../../../schema/models/country";
import Titles from "../../../schema/models/titles";
import sequelize, { col, WhereOptions } from "sequelize";
import { Op } from "sequelize";
import Language from "../../../schema/models/language";
import { getSortBy } from "../../../utils/helpers";

interface FilterParams {
  page: number;
  limitValue: number;
  skip: number;
  genres: number[];
  country: string;
  runtime: number;
  minimum_vote_count: number;
  from: string;
  to: string;
  original_language?: string;
}

export const filterService = async (
  filter: Filter,
  lang: string
): Promise<MovieList> => {
  try {
    const {
      page,
      limitValue,
      skip,
      genres,
      country,
      runtime,
      minimum_vote_count,
      from,
      to,
      original_language,
    } = await prepareFilterParams(filter, lang);

    const query: WhereOptions = await buildQuery({
      genres,
      country,
      runtime,
      minimum_vote_count,
      from,
      to,
    });

    const { column, order } = getSortBy(
      filter.sortBy ?? SortBy.POPULARITY_DESC
    );

    const movies: Movie[] = await fetchMovies(
      query,
      limitValue,
      skip,
      column,
      order
    );
    if (movies.length === 0) {
      return emptyMovieList();
    }

    const filteredMovies: IMovie[] = await filterMoviesByLanguage(
      movies,
      original_language,
      lang
    );

    if (filteredMovies.length === 0) {
      return emptyMovieList(page);
    }

    const totalMovies: number = await Movie.count({ where: query });
    const totalPages: number = Math.ceil(totalMovies / limitValue);
    const dates: DateRange = {
      minimum: await Movie.min("release_date"),
      maximum: await Movie.max("release_date"),
    };
    return {
      dates,
      page,
      total_results: totalMovies,
      total_pages: totalPages,
      results: filteredMovies,
    };
  } catch (error) {
    throw error;
  }
};

const prepareFilterParams = async (
  filter: Filter,
  lang: string
): Promise<FilterParams> => {
  const page = filter.page || 1;
  const limitValue = Math.min(filter.limit ?? 20, 20);
  const skip = (page - 1) * limitValue;
  const genres = filter.genres ?? [];
  const country = filter.country ?? "";
  const runtime = filter.runtime ?? 0;
  const minimum_vote_count = filter.minimum_vote_count ?? 0;
  const from = filter.from ?? "";
  const to = filter.to ?? "";
  const language_id = filter.language ?? "";

  let original_language: string | undefined;
  if (language_id && language_id !== "null") {
    const langRecord = await Language.findOne({ where: { id: language_id } });
    original_language = langRecord?.iso_639_1;
  } else {
    original_language = lang.split("-")[1];
  }

  return {
    page,
    limitValue,
    skip,
    genres,
    country,
    runtime,
    minimum_vote_count,
    from,
    to,
    original_language,
  };
};

const buildQuery = async ({
  genres,
  country,
  runtime,
  minimum_vote_count,
  from,
  to,
}: {
  genres: number[];
  country: string;
  runtime: number;
  minimum_vote_count: number;
  from: string;
  to: string;
}): Promise<WhereOptions> => {
  
  const query: WhereOptions = {};
  if (genres.length) query.genre_ids = { [Op.overlap]: genres };
  if (country) {
    const countryExists = await Country.findOne({ where: { id: country } });
    if (countryExists)
      query.production_countries = { [Op.contains]: [country] };
  }
  if (runtime) query.runtime = { [Op.gte]: runtime };
  if (minimum_vote_count) query.vote_count = { [Op.gte]: minimum_vote_count };

  return query;
};

const fetchMovies = async (
  query: WhereOptions,
  limitValue: number,
  skip: number,
  column: string,
  order: string
): Promise<Movie[]> => {
  return await Movie.findAll({
    attributes: [
      "id",
      "title",
      "overview",
      "poster_path",
      "backdrop_path",
      "release_date",
      "vote_average",
      "vote_count",
      "runtime",
      "production_countries",
      "spoken_languages",
      "original_title",
      "original_language",
      "genre_ids",
      "popularity",
      "adult",
      "video",
      "status",
      "imdb_id",
      "budget",
      "revenue",
      "tagline",
      "homepage",
      "youtube_key",
    ],
    where: query,
    limit: limitValue,
    offset: skip,
    order: [[column, order.toUpperCase()]],
    raw: true,
  });
};

const filterMoviesByLanguage = async (
  movies: Movie[],
  original_language: string | undefined,
  lang: string
): Promise<IMovie[]> => {
  const countryList = await Country.findAll();
  const langFilter = original_language || lang.split("-")[0];

  return await Promise.all(
    movies.map(async (movie) => {
      const countryId = countryList.find(
        (c) => c.iso_3166_1 === langFilter
      )?.id;
      const data = countryId
        ? await Titles.findOne({
            where: { movie_tv_id: movie.id, country_id: countryId },
          })
        : null;

      return {
        id: movie.id,
        title: data?.title || movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date?.toISOString(),
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        runtime: movie.runtime,
        production_countries: movie.production_countries,
        spoken_languages: movie.spoken_languages,
        original_title: movie.original_title,
        original_language: movie.original_language,
        genre_ids: movie.genre_ids,
        popularity: movie.popularity,
        adult: movie.adult,
        video: movie.video,
        status: movie.status,
        imdb_id: movie.imdb_id,
        budget: movie.budget,
        revenue: movie.revenue,
        tagline: movie.tagline,
        homepage: movie.homepage,
        youtube_key: movie.youtube_key,
      };
    })
  );
};

const emptyMovieList = (page: number = 1): MovieList => ({
  dates: { minimum: "", maximum: "" },
  page,
  total_results: 0,
  total_pages: 0,
  results: [],
});
