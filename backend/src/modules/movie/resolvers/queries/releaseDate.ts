import { GetReleaseDatesResponse } from "../../../../utils/types";

import { releaseDatesService } from "../../services";

export const movieReleaseDates = async (
  _: unknown,
  { id }: { id: number }
): Promise<GetReleaseDatesResponse> => {
  try {
    return releaseDatesService(id);
  } catch (error) {
    throw error;
  }
};
