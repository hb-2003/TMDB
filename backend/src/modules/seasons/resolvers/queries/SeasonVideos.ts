

import { GetVideosResponse } from "../../../../utils/types";
import { videoService } from "../../services";

export const SeasonVideos = async (
  _parent: any,
  { id ,season_number }: { id: number, season_number: number }
): Promise<GetVideosResponse> => {
  try {
    return await videoService(id, season_number);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
