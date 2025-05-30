import Movie from "../../schema/models/movie";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import {
  videoService,
  imageService,
  TranslationService,
  releaseDateService,
  creditService,
  movieTilesService,
  externalIdsService,
} from "../../services/movie";
import Country from "../../schema/models/country";
import Language from "../../schema/models/language";
import { companyServices } from "../company/company";
import { IMovie, MovieDetail, MovieApiResponse } from "../../utils/types";

const fetchWithRetry = async (url: string, retries = 0): Promise<any> => {
  try {
    return await axios.get(url);
  } catch (error) {
    if (retries === 3) throw error;
    return fetchWithRetry(url, retries + 1);
  }
};

export const upcomingMovie = async () => {
  let page = 1,
    total_pages = 1;

  while (page <= total_pages) {
    console.log(`Fetching upcoming movies for page ${page}`);
    try {
      const { data }: { data: MovieApiResponse } = await fetchWithRetry(
        endpoints.movies.upcoming(page)
      );

      page = data.page;
      total_pages = data.total_pages;

      const movieDetails: MovieDetail[] = (
        await Promise.all(data.results.map(({ id }) => fetchMovieDetails(id)))
      ).filter((detail): detail is MovieDetail => detail !== null);
      const newMovies: IMovie[] = (
        await Promise.all(movieDetails.map(processMovieDetail))
      ).filter(Boolean) as IMovie[];

      if (newMovies.length) {
        await Movie.bulkCreate(newMovies, {
          ignoreDuplicates: true,
        });
        await Promise.all(
          newMovies.map(({ id }) =>
            id
              ? Promise.all([
                  videoService(id),
                  imageService(id),
                  TranslationService(id),
                  releaseDateService(id),
                  creditService(id),
                  movieTilesService(id),
                  externalIdsService(id, "movie"),
                ])
              : Promise.resolve()
          )
        );
      }
    } catch (error) {
      await handleError(error, () => upcomingMovie());
    }
    console.timeEnd(`upcomingMovie for page ${page}`);
    page++;
  }
};

const getYoutubeKey = async (movieId: number): Promise<string | undefined> => {
  try {
    const {
      data: { results },
    } = await fetchWithRetry(endpoints.movies.videos(movieId));
    return results.find(({ type }: { type: string }) => type === "Trailer")
      ?.key;
  } catch (error) {
    throw error;
  }
};

const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetail | null> => {
  try {
    const { data } = await fetchWithRetry(endpoints.movies.details(movieId));
    return data;
  } catch (error) {
    throw error;
  }
};

const processMovieDetail = async (
  movieDetail: MovieDetail
): Promise<IMovie | null> => {
  try {
    if (await Movie.findOne({ where: { id: movieDetail.id } })) return null;

    const genre_ids: number[] = await Promise.all(
      movieDetail.genres.map(async ({ id }) => id)
    );
    const production_countries: string[] = await Promise.all(
      movieDetail.production_countries.map(async ({ iso_3166_1 }) => {
        const [country] = await Country.findOrCreate({
          where: { iso_3166_1 },
          defaults: {
            iso_3166_1,
            english_name: iso_3166_1,
            native_name: iso_3166_1,
          },
          attributes: ["id"],
        });
        return country.id;
      })
    );
    const spoken_languages: string[] = await Promise.all(
      movieDetail.spoken_languages.map(async ({ iso_639_1, name }) => {
        const [language] = await Language.findOrCreate({
          where: { iso_639_1 },
          defaults: { iso_639_1, name, english_name: name },
          attributes: ["id"],
        });
        return language.id;
      })
    );
    const production_companies: number[] =
      movieDetail.production_companies?.map(({ id }) => id) || [];
    await companyServices(production_companies);

    const youtube_key: string | undefined = await getYoutubeKey(movieDetail.id);

    const release_date: Date = movieDetail.release_date
      ? new Date(movieDetail.release_date)
      : new Date();

    return {
      ...movieDetail,
      genre_ids,
      production_countries,
      spoken_languages,
      production_companies,
      youtube_key,
      release_date,
    };
  } catch (error) {
    throw error;
  }
};
