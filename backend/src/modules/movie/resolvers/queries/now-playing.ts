import {
  NowPlayingFilter,
  SortBy,
  MovieList,
  IMovie,
} from "../../../../utils/types";
import { nowPlayingService } from "../../services";

export const nowPlayingMovies = async (
  _: unknown,
  { filter, language }: { filter: NowPlayingFilter; language: string }
): Promise<MovieList> => {
  try {

    return nowPlayingService(filter);
  } catch (error) {
    throw error;
  }
};
