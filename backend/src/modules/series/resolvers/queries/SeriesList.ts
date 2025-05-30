import Series from "../../../../schema/models/series";
import { GetSeriesListResponse, SeriesData } from "../../../../utils/types";
import { SeriesListService } from "../../services";


export const SeriesList = async (
  _: unknown,
  { page, language }: { page: number; language: string }
): Promise<GetSeriesListResponse> => {
  try {
    return await SeriesListService(page);
  } catch (error) {
    throw error;
  }
}
