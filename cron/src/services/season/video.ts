import { endpoints } from "../../config/endpoints";
import { VideoDetailTV, VideoResponse } from "../../utils/types";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { storeVideo } from "../common/video";

export const videoService = async (
  series_id: number,
  season_number: number
): Promise<void> => {
  try {
    const { data }: { data: VideoResponse } = await axios.get(
      endpoints.seasons.videos(series_id, season_number)
    );

    const videos: VideoDetailTV[] = data.results;
    await storeVideo(data.id, videos);
  } catch (error) {
    await handleError(error, () => videoService(series_id, season_number));
  }
}
