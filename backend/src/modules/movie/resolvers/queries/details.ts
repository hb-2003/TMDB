import { GetMovieDetailsResponse } from "../../../../utils/types";

import { detailService } from "../../services/details-service";

export const movieDetails = async (
  _: unknown,
  { id, language }: { id: number; language: string }
): Promise<GetMovieDetailsResponse> => {
  try {
    return detailService(id, language);
  } catch (error) {
    throw error;
  }
};
