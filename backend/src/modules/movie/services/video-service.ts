import { GetVideosResponse, VideoDetails } from "../../../utils/types";
import { getVideosData, getMovie } from "../../helper";

import CustomGraphqlError from "../../../shared-lib/errors";
import Video from "../../../schema/models/video";

export const videoService = async (id: number): Promise<GetVideosResponse> => {
  try {
    await getMovie(id);
    const videos: Video[] = await getVideosData(id);

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
  throw new CustomGraphqlError(`Error fetching videos for movie with id: ${id}`);
  }
}