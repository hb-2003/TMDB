import CustomGraphqlError from "../../../../shared-lib/errors";
import { getMessage } from "../../../../utils/message";
import { MovieDetailsOptions } from "../../../../utils/types";
import { MovieDetailsOptionsService } from "../../services/Movie-details-options-service";

export const getMovieDetailsOptions = async (
  _: unknown,
  { id }: { id: number }
): Promise<MovieDetailsOptions> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("MOVIE_ID_REQUIRED"), "MOVIE_ID_REQUIRED");
    }
    return await MovieDetailsOptionsService(id);
  } catch (error) {
    throw error;
  }
}

