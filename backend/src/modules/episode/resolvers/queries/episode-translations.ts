import { episodeTranslationsService } from "../../services";
import { GetSeasonTranslationsResponse } from "../../services/type";

export const episodeTranslations = async (
  _: unknown,
  { seriesId, seasonNumber, episodeNumber }: { seriesId: number; seasonNumber: number; episodeNumber: number }
): Promise<GetSeasonTranslationsResponse> => {
  try {
    return await episodeTranslationsService(seriesId, seasonNumber, episodeNumber);
  } catch (error) {
    throw error;
  }
}