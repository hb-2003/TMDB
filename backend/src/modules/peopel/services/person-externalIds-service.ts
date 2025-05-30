import ExternalIds from "../../../schema/models/external_ids";
import { ExternalIdsData } from "./type";

export const personExternalIdsService = async (id: number): Promise<ExternalIdsData> => {
  try {
    const ids = await ExternalIds.findOne({
      where: { movie_tv_person_id: id }
    });
    
    return {
      imdb_id: ids?.imdb_id || '',
      wikidata_id: ids?.wikidata_id || '',
      facebook_id: ids?.facebook_id || '',
      instagram_id: ids?.instagram_id || '',
      twitter_id: ids?.twitter_id || '',
      id: ids?.movie_tv_person_id || 0
    };
  } catch (error) {
    throw error;  
  }
}
