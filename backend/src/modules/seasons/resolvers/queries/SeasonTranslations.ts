import { GetImagesResponse, GetSeasonTranslationsResponse } from "../../../../utils/types";



import { getMessage } from "../../../../utils/message";
import CustomGraphqlError from "../../../../shared-lib/errors";
import { imageService } from "../../../series/services";
import { SeasonTranslationsService } from "../../services";

export const SeasonTranslations = async (
  _: unknown,
  { id, season_number }: { id: number, season_number: number }
): Promise<GetSeasonTranslationsResponse> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("ID_NOT_PROVIDED"), "ID not provided");
    }
    return await SeasonTranslationsService(id, season_number);
  } catch (error) {
    throw error;
  }
};
