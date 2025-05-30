import { GetImagesResponse } from "../../../../utils/types";
import { imageService } from "../../services";


import { getMessage } from "../../../../utils/message";
export const movieImages = async (
  _: unknown,
  { id }: { id: number }
): Promise<GetImagesResponse> => {
  try {
    return await imageService(id);
  } catch (error) {
    // throw new CustomGraphqlError(getMessage("INTERNAL_SERVER_ERROR"));
    throw error;
  }
};
