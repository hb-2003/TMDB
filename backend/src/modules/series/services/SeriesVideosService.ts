import { GetVideosResponse, VideoDetails } from "../../../utils/types";
import { getVideosData, getSeries } from "../../helper";

export const videoService = async (id: number): Promise<GetVideosResponse> => {
  try {
    await getSeries(id);
    const videos: VideoDetails[] = await getVideosData(id);
    if (!videos || videos.length === 0) {
      return { id, results: [] };
    }

    const videosResponse: VideoDetails[] = videos.map(
      (video): VideoDetails => ({
      id: video.id,
      iso_3166_1: video.iso_3166_1,
      iso_639_1: video.iso_639_1,
      key: video.key,
      name: video.name,
      published_at: video.published_at,
      site: video.site,
      size: video.size,
      type: video.type
      })
    );
    return { id, results: videosResponse };
    } catch (error) {
    return { id, results: [] };
    }
  };
