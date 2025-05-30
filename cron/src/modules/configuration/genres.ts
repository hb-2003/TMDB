import { endpoints } from "../../config/endpoints";
import Genre from "../../schema/models/genre";
import { handleError } from "../../utils/error";

import { IGenre } from "../../utils/types";
import axios, { AxiosResponse } from "axios";



if (!endpoints?.genres?.movieList || !endpoints?.genres?.tvList) {
  throw new Error("Endpoints are not properly defined");
}

export const genreService = async (): Promise<void> => {
  try {
    await Promise.all([getMovieGenres(), getTvGenres()]);
  } catch (error) {
    
  }
};

const fetchAndStoreGenres = async (URL: string): Promise<void> => {
  try {
    const { data }: { data: { genres: IGenre[] } } = await axios.get(URL);
    const genres: IGenre[] = data.genres;
    await storeGenresInBulk(genres);
  } catch (error) {
    
  }
};

export const getMovieGenres = async (): Promise<void> =>
  fetchAndStoreGenres(endpoints.genres.movieList);
export const getTvGenres = async (): Promise<void> =>
  fetchAndStoreGenres(endpoints.genres.tvList);

const storeGenresInBulk = async (genres: IGenre[]): Promise<void> => {
  try {
    const existingGenres: IGenre[] = await Genre.findAll({
      where: {
        id: genres.map((genre) => genre.id),
      },
    });

    const existingGenreIds: number[] = existingGenres.map((genre) => genre.id);
    const newGenres = genres.filter(
      (genre) => !existingGenreIds.includes(genre.id)
    );

    if (newGenres.length > 0) {
      await Genre.bulkCreate(newGenres);
    }
  } catch (error: unknown) {
    await handleError(error, () => storeGenresInBulk(genres));
  }
};
