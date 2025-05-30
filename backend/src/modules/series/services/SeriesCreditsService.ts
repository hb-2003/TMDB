import {
  CastDetails,
  GetTvShowCreditsResponse,
  CrewDetails,
} from "../../../utils/types";

import { getCrewData, getCastData, getMovie, getSeries } from "../../helper";


export const creditService = async (
  id: number,
  language: string
): Promise<GetTvShowCreditsResponse> => {
  try {
    await getSeries(id);

    const [cast, crew]: [CastDetails[], CrewDetails[]] = await Promise.all([
      getCastData(id, "tv"),
      getCrewData(id, "tv"),
    ]);
    return { id, cast, crew };
  } catch (error) {
    throw error;
  }
};
