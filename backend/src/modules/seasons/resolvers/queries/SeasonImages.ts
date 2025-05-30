import { GetImagesResponse } from "../../../../utils/types";



import { getMessage } from "../../../../utils/message";
import CustomGraphqlError from "../../../../shared-lib/errors";
import { imageService } from "../../services";


export const SeasonImages = async (
  _: unknown,
  { id, season_number }: { id: number, season_number: number }
): Promise<GetImagesResponse> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("ID_NOT_PROVIDED"), "ID not provided");
    }
    return await imageService(id, season_number);
  } catch (error) {
    throw error;
  }
};
