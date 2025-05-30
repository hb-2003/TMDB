import Seasons from "../../../schema/models/seasons";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { GetImagesResponse } from "../../../utils/types";
import { getImagesData, getSeries } from "../../helper";

export const imageService = async (id: number, season_number: number): Promise<GetImagesResponse> => {
  try {
    await getSeries(id);
    console.log("id", id);
    const seasons: Seasons | null = await Seasons.findOne({ where: { series_id: id, season_number: season_number } });
    if (!seasons) {
      throw new CustomGraphqlError(getMessage("SEASON_NOT_FOUND"), "SEASON_NOT_FOUND");
    }
    return await getImagesData(seasons.id);
  } catch (error) {
    throw error;
  }
};
