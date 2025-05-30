import {
  GetMovieDetailsResponse,
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "../../../utils/types";
import CustomGraphqlError from "../../../shared-lib/errors";

import Movie from "../../../schema/models/movie";
import {
  getGenresData,
  getProductionCompaniesData,
  getProductionCountriesData,
  getSpokenLanguagesData,
} from "../../helper";
import Titles from "../../../schema/models/titles";
import Country from "../../../schema/models/country";
import { getMessage } from "../../../utils/message";
import UserWatchlist from "../../../schema/models/user_watchlist";

export const detailService = async (
  id: number,
  language: string
): Promise<GetMovieDetailsResponse> => {
  try {

    const movie: Movie | null = await Movie.findOne({ where: { id } });
    if (!movie)
      throw new CustomGraphqlError(
        getMessage("MOVIE_NOT_FOUND"),
        "MOVIE_NOT_FOUND"
      );
    const country: Country | null = await Country.findOne({
      where: { iso_3166_1: language.split("-")[1] },
    });

    const title: Titles | null = country
      ? await Titles.findOne({
        where: { movie_tv_id: id, country_id: country.id },
      })
      : null;
    const [genres, productionCompanies, productionCountries, spokenLanguages]: [
      Genre[],
      ProductionCompany[],
      ProductionCountry[],
      SpokenLanguage[]
    ] = await Promise.all([
      getGenresData(movie.genre_ids),
      getProductionCompaniesData(movie.production_companies),
      getProductionCountriesData(movie.production_countries),
      getSpokenLanguagesData(movie.spoken_languages),
    ]);
    const watchlist: UserWatchlist | null = await UserWatchlist.findOne({
      where: { media_id: id, media_type: "movie" },
    });
    return {
      id: movie.id,
      title: title?.title || movie.title || "",
      original_title: movie.original_title || "",
      overview: movie.overview || "",
      vote_average: movie.vote_average || 0,
      vote_count: movie.vote_count || 0,
      popularity: movie.popularity || 0,
      adult: movie.adult || false,
      original_language: movie.original_language || "",
      poster_path: movie.poster_path || "",
      backdrop_path: movie.backdrop_path || "",
      video: movie.video || false,
      release_date: movie.release_date?.toISOString() || "",
      imdb_id: movie.imdb_id || "",
      budget: movie.budget || 0,
      revenue: movie.revenue || 0,
      runtime: movie.runtime || 0,
      status: movie.status || "",
      tagline: movie.tagline || "",
      homepage: movie.homepage || "",
      youtube_key: movie.youtube_key || "",
      genres: genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
      })) || [],
      production_companies: productionCompanies.map((company) => ({
      id: company.id,
      logo_path: company.logo_path || "",
      name: company.name,
      origin_country: company.origin_country,
      })) || [],
      production_countries: productionCountries || [],
      spoken_languages: spokenLanguages || [],
      watchlist: watchlist ? watchlist.watchlist : false,
      favorite: watchlist ? watchlist.favorite : false,
      rating: watchlist ? watchlist.rating : 0,
    };
  } catch (error) {
    throw error;
  }
};
