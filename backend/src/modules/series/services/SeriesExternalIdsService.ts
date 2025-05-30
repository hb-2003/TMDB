import ExternalIds from "../../../schema/models/external_ids";
import { SeriesExternalIdsResponse } from "../../../utils/types"
export const SeriesExternalIdsService = async ( id: number) : Promise<SeriesExternalIdsResponse> => {
  try {
    const externalIds = await ExternalIds.findOne({
      where: { movie_tv_person_id: id, type: "tv" },
    });

    return {
      id,
      imdb_id: externalIds?.imdb_id,
      freebase_mid: externalIds?.freebase_mid,
      freebase_id: externalIds?.freebase_id,
      tvdb_id: externalIds?.tvdb_id,
      tvrage_id: externalIds?.tvrage_id,
      wikidata_id: externalIds?.wikidata_id,
      facebook_id: externalIds?.facebook_id,
      instagram_id: externalIds?.instagram_id,
      twitter_id: externalIds?.twitter_id,
    };
  } catch (error) {
    throw error;
  }
}
