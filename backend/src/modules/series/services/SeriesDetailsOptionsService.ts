import { SeriesDetailsOptions } from '../../../utils/types';
import Titles from '../../../schema/models/titles';
import Seasons from '../../../schema/models/seasons';
import Translation from '../../../schema/models/translation';
import Image from '../../../schema/models/image';
import Video from '../../../schema/models/video';
import Cast from '../../../schema/models/cast';
import Crew from '../../../schema/models/crew';
import ExternalIds from '../../../schema/models/external_ids';
import Review from '../../../schema/models/review';


export const SeriesDetailsOptionsService = async (series_id: number): Promise<SeriesDetailsOptions> => {
  try {
    const alternativeTitlesCount: number = await Titles.count({ where: { movie_tv_id: series_id } });
    const seasonsCount: number = await Seasons.count({ where: { series_id: series_id } });
    const translationsCount: number = await Translation.count({ where: { movie_tv_id: series_id } });
    const backdropsCount: number = await Image.count({ where: { movie_tv_id: series_id, type: "backdrop" } });
    const logosCount: number = await Image.count({ where: { movie_tv_id: series_id, type: "logo" } });
    const postersCount: number = await Image.count({ where: { movie_tv_id: series_id, type: "poster" } });
    const videosCount: number = await Video.count({ where: { movie_tv_id: series_id } });
    const castCount: number = await Cast.count({ where: { movie_tv_id: series_id } });
    const crewCount: number = await Crew.count({ where: { movie_tv_id: series_id } });
    const externalIds: ExternalIds | null = await ExternalIds.findOne({ where: { movie_tv_person_id: series_id } });
    const reviewCount: number = await Review.count({ where: { media_id: series_id, media_type: "tv" } });

    return {
      alternativeTitles: alternativeTitlesCount > 0,
      seasons: seasonsCount > 0,
      translations: translationsCount > 0,
      backdrops: backdropsCount > 0,
      logos: logosCount > 0,
      posters: postersCount > 0,
      videos: videosCount > 0,
      credits: castCount > 0 && crewCount > 0,
      externalIds: externalIds !== null,
      reviews: reviewCount > 0,
    };
  } catch (error) {
    throw error;
  }
}