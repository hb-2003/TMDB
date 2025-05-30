import CustomGraphqlError from "../../../../shared-lib/errors";
import { MovieList } from "../../../../utils/types";
import { getMessage } from "../../../../utils/message";
import { topRatedService } from "../../services";

export const topRatedMovies = async (
  _: unknown,
  { page, language }: { page: number; language: string }
): Promise<MovieList> => {
  try {
    return topRatedService(page, language);
  } catch (error) {
    throw new CustomGraphqlError(
      getMessage("INTERNAL_SERVER_ERROR"),
      "INTERNAL_SERVER_ERROR"
    );
  }
};
