import { TranslationResponse } from "../../utils/types";
import axios from "../../config/axiosConfig";


import { endpoints } from "../../config/endpoints";
import { handleError } from "../../utils/error";
import { storeTranslations } from "../common/translation";


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const translateService = async (
  series_id: number,
  season_number: number,
  episode_number: number
): Promise<void> => {
  try {
    const { data }: { data: TranslationResponse } = await axios.get(
      endpoints.episodes.translations(series_id, season_number, episode_number)
    );
    await storeTranslations(data);
  } catch (error) {
    await handleError(error, () =>  translateService(series_id, season_number, episode_number));
  }
}
