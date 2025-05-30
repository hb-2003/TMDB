import {
  TranslationDetails,
  GetMovieTranslationsResponse,
} from "../../../utils/types";
import { getMovie } from "../../helper";
import Translation from "../../../schema/models/translation";
import Country from "../../../schema/models/country";
import Language from "../../../schema/models/language";
import Titles from "../../../schema/models/titles";

export const translationsService = async (
  movieId: number | null | undefined,
): Promise<GetMovieTranslationsResponse> => {
  if (movieId == null) {
    return { id: 0, translations: [] };
  }

  try {
    await getMovie(movieId);

    const [translations, countries, languages, titles]: [
      Translation[],
      Country[],
      Language[],
      Titles[]
    ] = await Promise.all([
      Translation.findAll({ where: { movie_tv_id: movieId } }),
      Country.findAll(),
      Language.findAll(),
      Titles.findAll({ where: { movie_tv_id: movieId } }),
    ]);

    if (!translations) {
      return { id: movieId, translations: [] };
    }

    const translationsResponse: TranslationDetails[] = translations.map(
      (translation): TranslationDetails => ({
        language:
          languages.find((lang) => lang.iso_639_1 === translation.language_id)
            ?.english_name || "",
        country_code:
          "en-" +
            countries.find((c) => c.id === translation.country_id)
              ?.iso_3166_1 || "",
        title:
          titles.find((t) => t.country_id === translation.country_id)?.title ||
          "Add title",
        tagline: translation.tagline || "Add tagline",
        overview: translation.overview || "Add overview",
        runtime: translation.runtime || 0,
        homepage: translation.homepage || "Add homepage",
      })
    );
    return { id: movieId, translations: translationsResponse };
  } catch (error) {
    return { id: movieId, translations: [] };
  }
};
