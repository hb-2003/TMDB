import ExternalIds from "../../schema/models/external_ids";
import { handleError } from "../../utils/error";
import { ExternalIdsData } from "../../utils/types";

export const storeExternalIds = async (
  data: ExternalIdsData,
  type: string
): Promise<void> => {
  try {
    await ExternalIds.create({
      movie_tv_person_id: data.id,
      type,
      imdb_id: data.imdb_id,
      freebase_mid: data.freebase_mid || "",
      freebase_id: data.freebase_id || "",
      tvdb_id: data.tvdb_id || 0,
      tvrage_id: data.tvrage_id || 0,
      wikidata_id: data.wikidata_id || "",
      facebook_id: data.facebook_id || "",
      instagram_id: data.instagram_id || "",
      twitter_id: data.twitter_id || "",
    });
  } catch (error) {
    handleError(error, () => storeExternalIds(data, type));
  }
};
