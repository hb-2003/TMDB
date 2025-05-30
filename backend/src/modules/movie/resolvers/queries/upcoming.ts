import { GetMovieRecommendationsResponse, IMovie } from "../../../../utils/types";
import { upcomingService } from "../../services";

export const MovieUpcoming = async (
  _: unknown,
  { page, language }: { page: number; language: string }
): Promise<GetMovieRecommendationsResponse> => {
  try{
    return upcomingService(page, language);
  } catch (err) {
    throw err;
  }
}
