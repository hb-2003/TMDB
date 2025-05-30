import Episode from "../../../schema/models/episodes";
import Video from "../../../schema/models/video";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { GetVideosResponse, VideoDetails } from "./type";

export const episodeVideosService = async (
  seriesId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<GetVideosResponse> => {
  try {
    const episode: Episode | null = await Episode.findOne({ where: { series_id: seriesId, season_number: seasonNumber, episode_number: episodeNumber } });
    if (!episode) {
      throw new CustomGraphqlError(getMessage("EPISODE_NOT_FOUND"), "EPISODE_NOT_FOUND");
    }
    console.log(episode.id);

    const video: Video[] = await Video.findAll({ where: { movie_tv_id: episode.id } });

    const results: VideoDetails[] = video.map((video) => {
      return {
        id: video.id,
        iso_639_1: video.iso_639_1,
        iso_3166_1: video.iso_3166_1,
        key: video.key,
        name: video.name,
        site: video.site,
        size: video.size,
        type: video.type,
        published_at: video.published_at
      };
    });

    return {
      id: episode.id,
      results
    };

  } catch (error) {
    throw error;
  }
}