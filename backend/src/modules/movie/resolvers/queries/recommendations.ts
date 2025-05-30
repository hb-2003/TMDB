import { recommendationsService } from "../../services";
import { GetMovieRecommendationsResponse } from "../../../../utils/types";
``;
export const movieRecommendations = async (
  _: any,
  { id, page, language }: { id: number; page: number; language: string }
): Promise<GetMovieRecommendationsResponse> => {
  try {
    return await recommendationsService(id, page, language);
  } catch (err) {
    throw err;
  }
};
