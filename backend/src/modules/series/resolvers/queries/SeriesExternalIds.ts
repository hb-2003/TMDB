import { SeriesExternalIdsResponse } from "../../../../utils/types";
import { SeriesExternalIdsService } from "../../services";

export const SeriesExternalIds = async (
  _:unknown,
  { id }: { id: number }
): Promise<SeriesExternalIdsResponse> => {
  try {
    return await SeriesExternalIdsService(id);
  } catch (error) {
    throw error;
  }
}