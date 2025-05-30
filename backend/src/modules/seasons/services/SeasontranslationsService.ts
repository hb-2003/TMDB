import {
  TranslationDetails,
  GetSeasonTranslationsResponse,
} from "../../../utils/types";
import { getMovie, getSeries } from "../../helper";
import Translation from "../../../schema/models/translation";
import Country from "../../../schema/models/country";
import Language from "../../../schema/models/language";
import Titles from "../../../schema/models/titles";
import Seasons from "../../../schema/models/seasons";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const SeasonTranslationsService = async (
  id: number,
  season_number: number
): Promise<GetSeasonTranslationsResponse> => {
  if (!id) {
    return { id: 0, translations: [] };
  }

  try {
    await getSeries(id);

    const season: Seasons | null = await Seasons.findOne({ where: { series_id: id, season_number: season_number } });
    if (!season) {
      throw new CustomGraphqlError(getMessage("SEASON_NOT_FOUND"), "SEASON_NOT_FOUND");
    }
    const [translations, countries, languages, titles]: [
      Translation[],
      Country[],
      Language[],
      Titles[]
    ] = await Promise.all([
      Translation.findAll({ where: { movie_tv_id: id } }),
      Country.findAll(),
      Language.findAll(),
      Titles.findAll({ where: { movie_tv_id: id } }),
    ]);

    if (!translations) {
      return {
        id: season.id,
        translations: [],
      };
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
    return { id: season.id, translations: translationsResponse };
  } catch (error) {
    throw error;
  }
}