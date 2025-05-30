import { endpoints } from "../../config/endpoints";
import Language from "../../schema/models/language";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";



export const languagesService = async (): Promise<void> => {
  try {
    const { data: languages } = await axios.get(
      endpoints.configuration.languages
    );
    for (const language of languages) {
      await Language.findOrCreate({
        where: { iso_639_1: language.iso_639_1 },
        defaults: language,
      });
    }
  } catch (error) {
    await handleError(error, () => languagesService());
  }
};
