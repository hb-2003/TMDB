import { TranslationResponse } from "../../utils/types";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";

import { endpoints } from "../../config/endpoints";
import { storeTranslations } from "../common/translation";



export const TranslationService = async (movie_id: number): Promise<void> => {
  try {
    const { data }: { data: TranslationResponse } = await axios.get(
      endpoints.movies.translations(movie_id)
    );
    await storeTranslations(data);
  } catch (error) {
    
    await handleError(error, () => TranslationService(movie_id));
  }
};
