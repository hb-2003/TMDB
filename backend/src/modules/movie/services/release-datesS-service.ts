import { GetReleaseDatesResponse } from "../../../utils/types";
import { getReleaseDatesData, getMovie } from "../../helper";
import CustomGraphqlError from "../../../shared-lib/errors";

export const releaseDatesService = async (
  id: number
): Promise<GetReleaseDatesResponse> => {
  try {
    await getMovie(id);

    const releaseDatesData: GetReleaseDatesResponse = await getReleaseDatesData(id);
    return releaseDatesData;
  } catch (error: unknown) {
    throw error;
  }
};
