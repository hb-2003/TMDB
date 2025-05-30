import Country from "../../../schema/models/country"
import Episode from "../../../schema/models/episodes"
import Language from "../../../schema/models/language"
import Titles from "../../../schema/models/titles"
import Translation from "../../../schema/models/translation"
import CustomGraphqlError from "../../../shared-lib/errors"
import { getMessage } from "../../../utils/message"
import { GetSeasonTranslationsResponse, TranslationDetails } from "./type"

export const episodeTranslationsService = async (
  seriesId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<GetSeasonTranslationsResponse> => {
  try {
    const episode: Episode | null = await Episode.findOne({
      where: {
        series_id: seriesId,
        season_number: seasonNumber,
        episode_number: episodeNumber
      }
    })
    if (!episode) {
      throw new CustomGraphqlError(getMessage("EPISODE_NOT_FOUND"), "EPISODE_NOT_FOUND")
    }
    // const translations: Translation[] = await Translation.findAll({
    //   where: { movie_tv_id: episode.id }
    // })

    const [translations, countries, languages, titles]: [
      Translation[],
      Country[],
      Language[],
      Titles[]
    ] = await Promise.all([
      Translation.findAll({ where: { movie_tv_id: episode.id } }),
      Country.findAll(),
      Language.findAll(),
      Titles.findAll({ where: { movie_tv_id: episode.id } }),
    ]);

    if (!translations) {
      return {
        id: episode.id,
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
    return { id: episode.id, translations: translationsResponse };
  } catch (error) {
    throw error;
  }
}

