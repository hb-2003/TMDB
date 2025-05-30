import { GetMovieTranslationsResponse } from "../../../../utils/types";
import { getMovie, getSeries } from "../../../helper";
import { SeriesTranslationsService } from "../../services";

export const SeriesTranslations = async (
  _: unknown,
  { id, language }: { id: number; language: string },
): Promise<GetMovieTranslationsResponse> => {
  try {
    await getSeries(id);
    return SeriesTranslationsService(id);
  } catch (error) {
    return { id, translations: [] };
  }
};
