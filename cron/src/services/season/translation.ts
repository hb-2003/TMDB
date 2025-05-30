import { TranslationResponse } from "../../utils/types";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";

import { endpoints } from "../../config/endpoints";
import { storeTranslations } from "../common/translation";


const truncateString = (str: string, maxLength: number) =>
  str.length > maxLength ? str.substring(0, maxLength) : str;


export const translateService = async (
  series_id: number,
  season_number: number
): Promise<void> => {
  try {
    const { data }: { data: TranslationResponse } = await axios.get(
      endpoints.seasons.translations(series_id, season_number)
    );

    await storeTranslations(data);
  } catch (error) {
    await handleError(error, () => translateService(series_id, season_number));
  }
}