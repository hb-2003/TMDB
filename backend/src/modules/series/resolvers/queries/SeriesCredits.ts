import { GetTvShowCreditsResponse } from "../../../../utils/types";

import { ADDRGETNETWORKPARAMS } from "node:dns/promises";
import { creditService } from "../../services";

export const SeriesCredits = async (
  _: unknown,
  { id, language }: { id: number; language: string }
): Promise<GetTvShowCreditsResponse> => {
  try {
    return await creditService(id, language);
  } catch (error) {
    throw error;
  }
};
