
import { episodeDetailsService } from "../../services";
import { EpisodeDetails } from "../../type";

export const episodeDetails = async (_: any, { seriesId, seasonNumber, episodeNumber }: { seriesId: number, seasonNumber: number, episodeNumber: number }): Promise<EpisodeDetails> => {
  try {
    return await episodeDetailsService(seriesId, seasonNumber, episodeNumber);
  } catch (error) {
    throw error;
  }
}