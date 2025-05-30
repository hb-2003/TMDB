import { GetMovieExternalIdsResponse } from "../../../utils/types";
import ExternalIds from "../../../schema/models/external_ids";

import { getMovie } from "../../helper";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const externalIdsService = async (
  id: number
): Promise<GetMovieExternalIdsResponse> => {
  try {
   await getMovie(id);
    const data: ExternalIds | null = await ExternalIds.findOne({
      where: { movie_tv_person_id: id, type: "movie" },
    });

    return {
      id,
      imdb_id: data?.imdb_id || "",
      wikidata_id: data?.wikidata_id || "",
      facebook_id: data?.facebook_id || "",
      instagram_id: data?.instagram_id || "",
      twitter_id: data?.twitter_id || "",
    };
  } catch (error) {
    throw error;
  }
};
