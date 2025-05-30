import { TranslationResponse } from "../../utils/types";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";

import { endpoints } from "../../config/endpoints";
import { storeTranslations } from "../common/translation";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const TranslationService = async (id: number): Promise<void> => {
  try {
    const { data }: { data: TranslationResponse } = await axios.get(
      endpoints.tv.translations(id)
    );
    if (!data.translations) return;

    await storeTranslations(data);
  } catch (error) {
    await handleError(error, () => TranslationService(id));
  }
};
