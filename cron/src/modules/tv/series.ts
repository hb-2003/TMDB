import Series, { SeriesAttributes } from "../../schema/models/series";
import axios from "axios";
import { endpoints } from "../../config/endpoints";
import Country from "../../schema/models/country";
import Company from "../../schema/models/company";
import Language from "../../schema/models/language";
import { SeriesDetails, SeriesResponse } from "../../utils/types";
import {
  imageService,
  videoService,
  TranslationService,
  networkService,
  creditService,
  tvTilesService,
  externalIdsService,
} from "../../services/tv";
import { seasonService } from "./season";
import { handleError } from "../../utils/error";
import { companyServices } from "../company/company";

const fetchSeriesDetails = async (id: number): Promise<SeriesDetails> => {
  const { data }: { data: SeriesDetails } = await axios.get(
    endpoints.tv.details(id)
  );
  return data || ({} as SeriesDetails);
};

const mapSeriesDetails = async (
  data: SeriesDetails
): Promise<SeriesAttributes> => ({
  id: data.id,
  name: data.name || "Unknown",
  overview: data.overview?.slice(0, 255) || "Unknown",
  poster_path: data.poster_path || "",
  backdrop_path: data.backdrop_path || "",
  first_air_date: new Date(data.first_air_date),
  last_air_date: new Date(data.last_air_date),
  number_of_episodes: data.number_of_episodes || 0,
  number_of_seasons: data.number_of_seasons || 0,
  vote_average: data.vote_average || 0,
  vote_count: data.vote_count || 0,
  type: data.type || "Unknown",
  homepage: data.homepage?.slice(0, 255) || "",
  in_production: data.in_production || false,
  original_language: data.original_language || "Unknown",
  original_name: data.original_name?.slice(0, 255) || "Unknown",
  popularity: data.popularity || 0,
  tagline: data.tagline?.slice(0, 255) || "",
  status: data.status || "Unknown",
  origin_country: data.origin_country || [],
  languages: data.languages || [],
  production_companies: (
    await Promise.all(
      data.production_companies.map(async (company) => {
        const existingCompany = await Company.findOne({
          where: { id: company.id },
          attributes: ["id"],
        });
        return existingCompany ? 0 : company.id;
      })
    )
  ).filter((id) => id !== 0),
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
  network: data.networks?.map((network) => network.id) || [],
  created_by: data.created_by.map((creator) => creator.credit_id),
});

export const seriesService = async (): Promise<void> => {
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    try {
      console.log(`Fetching series data for page ${page}...`);
      const { data }: { data: SeriesResponse } = await axios.get(
        endpoints.discover.tv(page)
      );
      if (!data) return;
      totalPages = data.total_pages;

      const newSeriesIds = (
        await Promise.all(
          data.results.map(async (series) => {
            const existingSeries = await Series.findOne({
              where: { id: series.id },
              attributes: ["id"],
            });
            return existingSeries ? 0 : series.id;
          })
        )
      ).filter((id) => id !== 0);
      if (newSeriesIds.length > 0) {
        const seriesDetailsArray = await Promise.all(
          newSeriesIds.map(fetchSeriesDetails)
        );
        const newSeriesData = await Promise.all(
          seriesDetailsArray.map(mapSeriesDetails)
        );

        for (const seriesData of newSeriesData) {
          const existingSeries = await Series.findOne({
            where: { id: seriesData.id },
            attributes: ["id"],
          });
          if (existingSeries) continue;
          const series = await Series.create(seriesData);
          const seriesDetails = seriesDetailsArray.find(
            (details) => details.id === seriesData.id
          );

          if (seriesDetails) {
            for (const season of seriesDetails.seasons) {
              await seasonService(
                series.id,
                season.season_number,
                season.episode_count
              );
            }
            const ids =
              seriesDetails.networks?.map((network) => network.id) || [];
            await networkService(ids);
            await tvTilesService(series.id);
            await companyServices(seriesData.production_companies);
            await imageService(series.id);
            await videoService(series.id);
            await TranslationService(series.id);
            await creditService(series.id);
            await externalIdsService(series.id, "tv");
          }
        }
      }
    } catch (error) {
      await handleError(error, () => seriesService());
    }
    page++;
  }
};
