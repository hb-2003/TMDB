import { episodeCreditsService } from "../../services";
import { creditsResponse } from "../../type";

export const episodeCredits = async (
  _: unknown,
  { seriesId, seasonNumber, episodeNumber }: { seriesId: number; seasonNumber: number; episodeNumber: number }
): Promise<creditsResponse> => {
  try {
    return await episodeCreditsService(seriesId, seasonNumber, episodeNumber);
  } catch (error) {
    throw error;
  }
}