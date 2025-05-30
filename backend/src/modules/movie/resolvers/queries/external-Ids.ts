
import { GetMovieExternalIdsResponse } from "../../../../utils/types";
import { externalIdsService } from "../../services";

export const movieExternalIds = async (
  _: unknown,
  { id }: { id: number }
): Promise<GetMovieExternalIdsResponse> => {
  try {
    return await externalIdsService(id);
  } catch (error) {
    throw error;
  }
};
