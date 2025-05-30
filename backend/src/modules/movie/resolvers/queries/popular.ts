import Movie from "../../../../schema/models/movie";
import { MovieList, IMovie, DateRange } from "../../../../utils/types";
import { popularService } from "../../services";

export const popularMovies = async (
  _: unknown,
  { page, language }: { page: number; language: string }
): Promise<MovieList> => {
  try {
    return await popularService(page, language);
  } catch (error) {
    throw error;
  }
};
