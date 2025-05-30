import { GetMovieTranslationsResponse } from "../../../../utils/types";
import { getMovie } from "../../../helper";
import { translationsService } from "../../services";

export const movieTranslations = async (
  _: unknown,
  { id }: { id: number }
): Promise<GetMovieTranslationsResponse> => {
  try {
    await getMovie(id);
    return translationsService(id);
  } catch (error) {
    return { id, translations: [] };
  }
};
