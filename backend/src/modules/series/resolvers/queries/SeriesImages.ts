import { GetImagesResponse } from "../../../../utils/types";
import { imageService } from "../../services";


import { getMessage } from "../../../../utils/message";
import CustomGraphqlError from "../../../../shared-lib/errors";
export const SeriesImages = async (
  _: unknown,
  { id }: { id: number }
): Promise<GetImagesResponse> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage("ID_NOT_PROVIDED"), "ID not provided");
    }
    return await imageService(id);
  } catch (error) {
    throw error;
  }
};
