import { MovieDetailsOptions } from "../../../utils/types";

import Video from "../../../schema/models/video";
import Crew from "../../../schema/models/crew";
import Cast from "../../../schema/models/cast";
import ExternalIds from "../../../schema/models/external_ids";
import ReleaseDate from "../../../schema/models/releaseDate";
import Titles from "../../../schema/models/titles";
import Translation from "../../../schema/models/translation";
import Image from "../../../schema/models/image";



export const MovieDetailsOptionsService = async (movie_id: number): Promise<MovieDetailsOptions> => {
  try {
    const videoCount = await Video.count({ where: { movie_tv_id: movie_id } });
    const crewCount = await Crew.count({ where: { movie_tv_id: movie_id } });
    const castCount = await Cast.count({ where: { movie_tv_id: movie_id } });
    const externalIdsCount = await ExternalIds.count({ where: { movie_tv_person_id: movie_id } });
    const release_dateCount = await ReleaseDate.count({ where: { movie_id: movie_id } });
    const alternativeTitlesCount = await Titles.count({ where: { movie_tv_id: movie_id } });
    const translationsCount = await Translation.count({ where: { movie_tv_id: movie_id } });
    const backdropsCount = await Image.count({ where: { movie_tv_id: movie_id, type: "backdrop" } });
    const logosCount = await Image.count({ where: { movie_tv_id: movie_id, type: "logo" } });
    const postersCount = await Image.count({ where: { movie_tv_id: movie_id, type: "poster" } });
    return {
      videos: videoCount > 0,
      credits: crewCount > 0 && castCount > 0,
      externalIds: externalIdsCount > 0,
      releaseDates: release_dateCount > 0,
      alternativeTitles: alternativeTitlesCount > 0,
      translations: translationsCount > 0,
      backdrops: backdropsCount > 0,
      logos: logosCount > 0,
      posters: postersCount > 0,
      reviews: false,
    };
  } catch (error) {
    throw error;
  }
}
