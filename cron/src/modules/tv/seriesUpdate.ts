import Series, { SeriesAttributes } from "../../schema/models/series";
import axios from "axios";
import { endpoints } from "../../config/endpoints";

import Country from "../../schema/models/country";
import Company from "../../schema/models/company";
import Language from "../../schema/models/language";
import { SeriesDetails } from "../../utils/types";
import {
  imageService,
  videoService,
  TranslationService,
  networkService,
  creditService,
} from "../../services/tv";
import { seasonService } from "./season";
import { handleError } from "../../utils/error";
import { SeriesChangesResponse } from "../../utils/types";


const fetchSeriesDetails = async (id: number): Promise<SeriesDetails> => {
  const { data } = await axios.get(endpoints.tv.details(id));
  return data || ({} as SeriesDetails);
};


const mapSeriesDetails = async (
  data: SeriesDetails
): Promise<SeriesAttributes> => ({
  id: data.id,
  name: data.name || "Unknown",
  overview: data.overview ? data.overview.slice(0, 255) : "Unknown",
  poster_path: data.poster_path || "",
  backdrop_path: data.backdrop_path || "",
  first_air_date: new Date(data.first_air_date),
  last_air_date: new Date(data.last_air_date),
  number_of_episodes: data.number_of_episodes || 0,
  number_of_seasons: data.number_of_seasons || 0,
  vote_average: data.vote_average || 0,
  vote_count: data.vote_count || 0,
  type: data.type || "Unknown",
  homepage: data.homepage ? data.homepage.slice(0, 255) : "",
  in_production: data.in_production || false,
  original_language: data.original_language || "Unknown",
  original_name: data.original_name
    ? data.original_name.slice(0, 255)
    : "Unknown",
  popularity: data.popularity || 0,
  tagline: data.tagline ? data.tagline.slice(0, 255) : "",
  status: data.status || "Unknown",
  origin_country: data.origin_country || [],
  languages: data.languages || [],
  production_companies: await Promise.all(
    data.production_companies.map(async (company) => {
      const existingCompany = await Company.findOne({
        where: { id: company.id },
        attributes: ["id"],
      });
      return existingCompany ? 0 : company.id;
    })
  ),
  production_countries: (
    await Promise.all(
      data.production_countries.map(async (country) => {
        const existingCountry = await Country.findOne({
          where: { iso_3166_1: country.iso_3166_1 },
          attributes: ["id"],
        });
        return existingCountry ? existingCountry.id : undefined;
      })
    )
  ).filter((id): id is string => id !== undefined),
  spoken_languages: (
    await Promise.all(
      data.spoken_languages.map(async (language) => {
        const existingLanguage = await Language.findOne({
          where: { iso_639_1: language.iso_639_1 },
          attributes: ["id"],
        });
        return existingLanguage?.id;
      })
    )
  ).filter((id): id is string => id !== undefined),
  genre_ids: data.genres.map((genre) => genre.id),
  episode_run_time: data.episode_run_time || [],
  network: data.networks ? data.networks.map((network) => network.id) : [],
  created_by: data.created_by.map((creator) => creator.credit_id),
});

export const seriesUpdateService = async (): Promise<void> => {
  let page: number = 1;
  let totalPages: number = 1;

  while (page <= totalPages) {
    try {
     
      const { data }: { data: SeriesChangesResponse } = await axios.get(
        endpoints.changes.tv(page)
      );
      if (!data) return;

      const ExistingSeriesIds: number[] = await Promise.all(
        data.results.map(async (series) => {
          const existingSeries = await Series.findOne({
            where: { id: series.id },
            attributes: ["id"],
          });
          if (existingSeries) {
            return existingSeries.id;
          }
          return 0;
        })
      );

      const existingSeriesIds: number[] = ExistingSeriesIds.filter(
        (id) => id !== 0
      );
      if (existingSeriesIds.length > 0) {
        const seriesDetailsArray: SeriesDetails[] = await Promise.all(
          existingSeriesIds.map(fetchSeriesDetails)
        );
        const updatedSeriesData = await Promise.all(
          seriesDetailsArray.map(mapSeriesDetails)
        );

        await Promise.all(
          updatedSeriesData.map((seriesData) =>
            Series.update(seriesData, { where: { id: seriesData.id } })
          )
        );

        const seasonAndEpisode: {
          seriesId: number;
          season_number: number;
          episode_count: number;
        }[] = await Promise.all(
          seriesDetailsArray.flatMap((series) =>
            series.seasons.map((season) => ({
              seriesId: series.id,
              season_number: season.season_number,
              episode_count: season.episode_count,
            }))
          )
        );

        const networkIds: number[] = seriesDetailsArray.flatMap((series) =>
          series.networks ? series.networks.map((network) => network.id) : []
        );

        await Promise.all(
          seasonAndEpisode.map((data) =>
            seasonService(data.seriesId, data.season_number, data.episode_count)
          )
        );
        await Promise.all(networkIds.map((id) => networkService([id])));
        await Promise.all(existingSeriesIds.map((id) => imageService(id)));
        await Promise.all(existingSeriesIds.map((id) => videoService(id)));
        await Promise.all(
          existingSeriesIds.map((id) => TranslationService(id))
        );
        await Promise.all(existingSeriesIds.map((id) => creditService(id)));
      }
      page = data.page + 1;
      totalPages = data.total_pages;
    } catch (error) {
      await handleError(error, () => seriesUpdateService());
    }
  }
}
