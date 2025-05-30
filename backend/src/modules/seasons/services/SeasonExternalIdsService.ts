import ExternalIds from "../../../schema/models/external_ids";
import Seasons from "../../../schema/models/seasons";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { SeasonExternalIds } from "../../../utils/seasons";
import { getSeries } from "../../helper";

export const SeasonExternalIdsService = async (
  id: number,
  season_number: number
): Promise<SeasonExternalIds> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("SERIES_ID_REQUIRED"), "SERIES_ID_REQUIRED");
    }
    await getSeries(id);
    const Season: Seasons | null = await Seasons.findOne({
      where: {
        series_id: id,
        season_number: season_number,
      },
    });

    if (!Season) {
      throw new CustomGraphqlError(getMessage("SEASON_NOT_FOUND"), "SEASON_NOT_FOUND");
    }

    const external_ids: ExternalIds | null = await ExternalIds.findOne({
      where: {
        movie_tv_person_id: Season.id,
      },
    });

    if (!external_ids) {
      throw new CustomGraphqlError(getMessage("EXTERNAL_IDS_NOT_FOUND"), "EXTERNAL_IDS_NOT_FOUND");
    }

    return {
      id: id,
      freebase_mid: external_ids.freebase_mid,
      freebase_id: external_ids.freebase_id,
      tvdb_id: external_ids.tvdb_id,
      tvrage_id: external_ids.tvrage_id,
      wikidata_id: external_ids.wikidata_id,
    };
  } catch (error) {
    throw error;
  }
}
