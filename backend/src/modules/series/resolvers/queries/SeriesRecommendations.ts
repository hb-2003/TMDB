import { GetSeriesListResponse, SeriesData } from "../../../../utils/types";
import { SeriesRecommendationsService } from "../../services";


export const SeriesRecommendations = async (
  _: unknown,
  { id, page }: { id: number; page: number }
): Promise<GetSeriesListResponse> => {
  try {
    return await SeriesRecommendationsService(id, page);
  } catch (error) {
    throw error;
  }
}
