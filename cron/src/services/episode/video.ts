import { endpoints } from "../../config/endpoints";
import { VideoDetailTV, VideoResponse } from "../../utils/types";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { storeVideo } from "../common/video";

export const videoService = async (
  series_id: number,
  season_number: number,
  episode_number: number
): Promise<void> => {
  try {
    const { data: response }: { data: VideoResponse } = await axios.get(
      endpoints.episodes.videos(series_id, season_number, episode_number)
    );
    if (!response.results) return;
    const videos: VideoDetailTV[] = Array.isArray(response.results)
      ? response.results
      : [];
    await storeVideo(response.id, videos);
  } catch (error) {
    await handleError(error, () =>
      videoService(series_id, season_number, episode_number)
    );
  }
};
