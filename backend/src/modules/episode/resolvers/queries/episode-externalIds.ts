
import { episodeExternalIdsService } from "../../services";
import { ExternalIDDetails } from "../../services/type";

export const episodeExternalIds = async (
  _: unknown,
  { seriesId, seasonNumber, episodeNumber }: { seriesId: number; seasonNumber: number; episodeNumber: number }
): Promise<ExternalIDDetails> => {
  try {
    return await episodeExternalIdsService(seriesId, seasonNumber, episodeNumber);
  } catch (error) {
    throw error;
  }
}