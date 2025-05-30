import { GetImagesResponse } from "../../../utils/types";
import { getImagesData, getMovie } from "../../helper";

import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const imageService = async (id: number): Promise<GetImagesResponse> => {
  try {
    await getMovie(id);
    return await getImagesData(id);
  } catch (error) {
    throw error;
  }
};
