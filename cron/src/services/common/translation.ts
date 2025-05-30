import Translation from "../../schema/models/translation";
import { TranslationResponse, TranslationDetail } from "../../utils/types";
import { handleError } from "../../utils/error";
export interface ITranslation {
  movie_tv_id: number;
  country_id: string;
  language_id: string;
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}
export const storeTranslations = async (response: TranslationResponse) => {
  try {
    const translations: TranslationDetail[] = response.translations || [];
    const batchSize = 5;

    for (let i = 0; i < translations.length; i += batchSize) {
      const batch = translations.slice(i, i + batchSize);

      const newTranslations: ITranslation[] = (
        await Promise.all(
          batch.map(async (translation) => {
            const existingTranslation = await Translation.findOne({
              where: {
                movie_tv_id: response.id,
                country_id: translation.iso_3166_1,
                language_id: translation.iso_639_1,
              },
            });

            if (existingTranslation) {
              return null;
            }

            return {
              movie_tv_id: response.id,
              country_id: translation.iso_3166_1,
              language_id: translation.iso_639_1,
              homepage: translation.data.homepage || "",
              overview: translation.data.overview?.substring(0, 255) || "",
              runtime: translation.data.runtime || 0,
              tagline: translation.data.tagline || "",
              title: translation.data.title || "",
            };
          })
        )
      ).filter(
        (translation): translation is ITranslation => translation !== null
      );

      await Translation.bulkCreate(newTranslations);
    }
  } catch (error) {
    await handleError(error, () => storeTranslations(response));
  }
};
