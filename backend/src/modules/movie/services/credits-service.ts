import {
  CastDetails,
  GetMovieCreditsResponse,
  CrewDetails,
} from "../../../utils/types";

import { getCrewData, getCastData, getMovie } from "../../helper";
import Cast from "../../../schema/models/cast";
import Crew from "../../../schema/models/crew";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const creditService = async (
  id: number,
  language: string
): Promise<GetMovieCreditsResponse> => {
  try {
    await getMovie(id);
    
    const [cast, crew]: [CastDetails[], CrewDetails[]] = await Promise.all([
      getCastData(id, "movie"),
      getCrewData(id, "movie"),
    ]);
    return { id, cast, crew };
  } catch (error) {
    throw error;
  }
};
