import { episodeVideosService } from "../../services";
import { GetVideosResponse } from "../../services/type";

export const episodeVideos = async (
  _: unknown,
  { seriesId, seasonNumber, episodeNumber }: { seriesId: number; seasonNumber: number; episodeNumber: number }
): Promise<GetVideosResponse> => {
  try {
    return await episodeVideosService(seriesId, seasonNumber, episodeNumber);
  } catch (error) {
    throw error;
  }
}