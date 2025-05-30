import Episode from "../../schema/models/episodes";

import {
  imageService,
  translateService,
  videoService,
  creditService,
  externalIdsService,
} from "../../services/episode";
import { IEpisode, episodeResponse } from "../../utils/types";

import { guestStarService } from "../../services/tv";
import { handleError } from "../../utils/error";

export const episodeService = async (
  series_id: number,
  season_number: number,
  episodes: episodeResponse
): Promise<void> => {
  try {
    if (!episodes) return;
    const episodeData: IEpisode[] = episodes.episodes.map((episode) => ({
      id: episode.id,
      air_date: new Date(episode.air_date),
      episode_number: episode.episode_number,
      episode_type: episode.episode_type,
      name: episode.name,
      overview: episode.overview.slice(0, 255),
      production_code: episode.production_code,
      season_number: episode.season_number,
      still_path: episode.still_path,
      vote_average: episode.vote_average,
      series_id: series_id,
    }));

    await Episode.bulkCreate(episodeData, { ignoreDuplicates: true });
    await Promise.all(
      episodes.episodes.map(async (episode) => {
        await imageService(series_id, season_number, episode.episode_number);
        await translateService(
          series_id,
          season_number,
          episode.episode_number
        );
        await videoService(series_id, season_number, episode.episode_number);
        await creditService(series_id, season_number, episode.episode_number);
        await guestStarService(
          series_id,
          season_number,
          episode.episode_number,
          {
            guest_stars: episode.guest_stars,
          }
        );
        await externalIdsService(
          series_id,
          season_number,
          episode.episode_number,
          "episode"
        );
      })
    );
  } catch (error) {
    await handleError(error, () =>
      episodeService(series_id, season_number, episodes)
    );
  }
};
