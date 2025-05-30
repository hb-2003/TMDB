import Seasons from "../../schema/models/seasons";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";

import { SeasonResponse, episodeResponse } from "../../utils/types";
import { episodeService } from "./episode";
import {
  imageService,
  translateService,
  videoService,
  creditService,
  externalIdsService,
} from "../../services/season";
import { ISeason } from "../../utils/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchSeasons = async (
  series_id: number,
  season_number: number
): Promise<SeasonResponse> => {
  try {
    const { data }: { data: SeasonResponse } = await axios.get(
      endpoints.seasons.details(series_id, season_number)
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const seasonService = async (
  series_id: number,
  season_number: number,
  episode_count: number
): Promise<void> => {
  try {
    const exitStingSeason = await Seasons.findOne({
      where: { series_id, season_number },
      attributes: ["id"],
    });
    if (exitStingSeason) return;

    const season: SeasonResponse = await fetchSeasons(series_id, season_number);
    if (!season) return;
    const seasonData: ISeason = {
      id: season.id,
      name: season.name,
      overview: season.overview.slice(0, 255),
      poster_path: season.poster_path,
      season_number: season.season_number,
      series_id: series_id,
      episode_count: episode_count,
      air_date: new Date(season.air_date),
    };

    await Seasons.create(seasonData);
    await Promise.all([
      imageService(series_id, season_number),
      videoService(series_id, season_number),
      translateService(series_id, season_number),
      episodeService(series_id, season_number, {
        episodes: season.episodes,
      }),
      creditService(series_id, season_number),
      externalIdsService(series_id, season_number, "season"),
    ]);
  } catch (error) {
    await handleError(error, () =>
      seasonService(series_id, season_number, episode_count)
    );
  }
};
