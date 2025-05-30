import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { VideoDetailTV, VideoResponse } from "../../utils/types";
import { storeVideo } from "../common/video";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const videoService = async (id: number): Promise<void> => {
  try {
    const { data }: { data: VideoResponse } = await axios.get(
      endpoints.tv.videos(id)
    );
    const videos: VideoDetailTV[] = data.results;
    await storeVideo(data.id, videos);
  } catch (error) {
    await handleError(error, () => videoService(id));
  }
};
