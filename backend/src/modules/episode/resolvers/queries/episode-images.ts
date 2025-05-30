
import { episodeImagesService } from "../../services";
import { GetImagesResponse } from "../../type";

export const episodeImages = async (
  _: unknown,
  { seriesId, seasonNumber, episodeNumber }: { seriesId: number; seasonNumber: number; episodeNumber: number }
): Promise<GetImagesResponse> => {
  try {
    return await episodeImagesService(seriesId, seasonNumber, episodeNumber);
  } catch (error) {
    throw error;
  }
}