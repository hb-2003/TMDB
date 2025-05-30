import { endpoints } from "../../config/endpoints";
import { VideoDetailTV, VideoResponse } from "../../utils/types";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { storeVideo } from "../common/video";
export const videoService = async (id: number): Promise<void> => {
  try {
    const { data }: { data: VideoResponse } = await axios.get(
      endpoints.movies.videos(id)
    );

    const videos: VideoDetailTV[] = Array.isArray(data.results)
      ? data.results
      : [];
    await storeVideo(data.id, videos);
  } catch (error) {
    
    await handleError(error, () => videoService(id));
  }
}
