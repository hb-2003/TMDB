
import { GetVideosResponse } from "../../../../utils/types";
import { videoService } from "../../services";

export const movieVideos = async (
  _parent: any,
  { id }: { id: number }
): Promise<GetVideosResponse> => {
  try {
    return await videoService(id);
  } catch (error) {
    return { id, results: [] };
  }
}