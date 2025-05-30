import { GetImagesResponse } from "../../../utils/types";
import { getImagesData, getSeries } from "../../helper";

export const imageService = async (id: number): Promise<GetImagesResponse> => {
  try {
    await getSeries(id);
    return await getImagesData(id);
  } catch (error) {
    throw error;
  }
};
