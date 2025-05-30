import { Genre, ProductionCompany, ProductionCountry, SpokenLanguage, Season, SeriesDetails } from '../../../utils/types';
import Episode, { EpisodeAttributes } from '../../../schema/models/episodes';
import Network from '../../../schema/models/network';
import Seasons from '../../../schema/models/seasons';
import Series from '../../../schema/models/series';
import CustomGraphqlError from '../../../shared-lib/errors';
import { getMessage } from '../../../utils/message';
import { getGenresData, getNetwork, getProductionCompaniesData, getProductionCountriesData, getSeasons, getSpokenLanguagesData } from '../../helper';


export const SeriesDetailsService = async (id: number): Promise<SeriesDetails> => {
  try {
    if (!id) {
      throw new CustomGraphqlError(getMessage('SERIES_ID_REQUIRED'), "SERIES_ID_REQUIRED");
    }

    const series: Series | null = await Series.findOne({ where: { id } });

    if (!series) {
      throw new CustomGraphqlError(getMessage('SERIES_NOT_FOUND'), "SERIES_NOT_FOUND");
    }

    const genres: Genre[] = await getGenresData(series.genre_ids);
    const productionCompany: ProductionCompany[] = await getProductionCompaniesData(series.production_companies);
    const productionCountries: ProductionCountry[] = await getProductionCountriesData(series.production_countries);
    const spokenLanguages: SpokenLanguage[] = await getSpokenLanguagesData(series.spoken_languages);
    const networks: Network[] = (await Promise.all(series.network.map(async (id) => await Network.findOne({ where: { id } }))).then((data) => data.filter((network) => network !== null)) as Network[]);
    const seasons: Seasons[] = await getSeasons(id, series.number_of_seasons);
    const seasonData: Season[] = seasons.map((season: Seasons) => ({
      air_date: season.air_date?.toISOString().split('T')[0],
      episode_count: season.episode_count,
      id: season.id,
      name: season.name,
      overview: season.overview,
      poster_path: season.poster_path,
      season_number: season.season_number,
    }));


    const lastEpisodeData: EpisodeAttributes | null = await Episode.findOne({
      where: { series_id: id },
      order: [['air_date', 'ASC']]
    });


    const lastEpisode = lastEpisodeData ? {
      id: lastEpisodeData.id,
      name: lastEpisodeData.name,
      overview: lastEpisodeData.overview,
      vote_average: lastEpisodeData.vote_average,
      vote_count: 0,
      air_date: lastEpisodeData.air_date?.toISOString().split('T')[0],
      episode_number: lastEpisodeData.episode_number,
      episode_type: lastEpisodeData.episode_type,
      production_code: lastEpisodeData.production_code,
      runtime: 0,
      season_number: lastEpisodeData.season_number,
      show_id: lastEpisodeData.series_id,
      still_path: lastEpisodeData.still_path,
    } : undefined;

    const firstEpisodeData: EpisodeAttributes | null = await Episode.findOne({
      where: { series_id: id },
      order: [['air_date', 'DESC']]
    });

    const firstEpisode = firstEpisodeData ? {
      id: firstEpisodeData.id,
      name: firstEpisodeData.name,
      overview: firstEpisodeData.overview,
      vote_average: firstEpisodeData.vote_average,
      vote_count: 0,
      air_date: firstEpisodeData.air_date?.toISOString().split('T')[0],
      episode_number: firstEpisodeData.episode_number,
      episode_type: firstEpisodeData.episode_type,
      production_code: firstEpisodeData.production_code,
      runtime: 0,
      season_number: firstEpisodeData.season_number,
      show_id: firstEpisodeData.series_id,
      still_path: firstEpisodeData.still_path,
    } : undefined;

    const seriesDetails: SeriesDetails = {
      adult: false,
      backdrop_path: series.backdrop_path,
      created_by: series.created_by,
      episode_run_time: series.episode_run_time,
      first_air_date: series.first_air_date?.toISOString().split('T')[0],
      genres,
      homepage: series.homepage,
      id: series.id,
      in_production: series.in_production,
      languages: series.languages,
      last_air_date: series.last_air_date?.toISOString().split('T')[0],
      last_episode_to_air: lastEpisode,
      name: series.name,
      next_episode_to_air: firstEpisode,
      networks,
      number_of_episodes: series.number_of_episodes,
      number_of_seasons: series.number_of_seasons,
      origin_country: series.origin_country,
      original_language: series.original_language,
      original_name: series.original_name,
      overview: series.overview,
      popularity: series.popularity,
      poster_path: series.poster_path,
      production_companies: productionCompany,
      production_countries: productionCountries,
      seasons: seasonData,
      spoken_languages: spokenLanguages,
      status: series.status,
      tagline: series.tagline,
      type: series.type,
      vote_average: series.vote_average,
      vote_count: series.vote_count,
    };

    return seriesDetails;
  } catch (error) {
    throw error;
  }
};
