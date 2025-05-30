import { Filter, SortBy, MovieList, IMovie } from "../../../../utils/types";
import { filterService } from "../../services";

export const filterMovies = async (
  _: unknown,
  { filter, language }: { filter: Filter; language: string }
): Promise<MovieList> => {
  try {
    return await filterService(filter, language);
  } catch (error) {
    throw error;
  }
};
