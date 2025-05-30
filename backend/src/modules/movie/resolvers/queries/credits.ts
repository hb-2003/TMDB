import { GetMovieCreditsResponse } from "../../../../utils/types";

import { creditService } from "../../services";

export const movieCredits = async (
  _: unknown,
  { id, language }: { id: number; language: string }
): Promise<GetMovieCreditsResponse> => {
  try {
    return await creditService(id, language);
  } catch (error) {
    throw error;
  }
};
