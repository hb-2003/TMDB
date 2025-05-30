import Episode from "../../../schema/models/episodes"
import ExternalIds from "../../../schema/models/external_ids"
import { ExternalIDDetails } from "./type";


export const episodeExternalIdsService = async (
  seriesId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<ExternalIDDetails> => {
  try {

    const episode: Episode | null = await Episode.findOne({
      where: {
        series_id: seriesId,
        season_number: seasonNumber,
        episode_number: episodeNumber
      }
    });

    if (!episode) {
      throw new Error("Episode not found");
    }

    const externalIds: ExternalIds | null = await ExternalIds.findOne({
      where: {
        movie_tv_person_id: episode.id
      }
    });

    return {
      id: episode.id,
      imdb_id: externalIds?.imdb_id || "",
      freebase_mid: externalIds?.freebase_mid || "",
      freebase_id: externalIds?.freebase_id || "",
      tvdb_id: typeof externalIds?.tvdb_id === 'number' ? externalIds.tvdb_id : 0,
      tvrage_id: typeof externalIds?.tvrage_id === 'number' ? externalIds.tvrage_id : 0,
      wikidata_id: externalIds?.wikidata_id || ""
    };

  } catch (error) {
    throw error;
  }
}