import Series from "../../../schema/models/series";
import { GetSeriesListResponse, SeriesData } from "../../../utils/types";

export const SeriesListService = async (page: number): Promise<GetSeriesListResponse> => {
  try {
    const seriesList: Series[] = await Series.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });
    const data: SeriesData[] = seriesList.map((series) => {
      return {
        id: series.id,
        name: series.name,
        original_name: series.original_name,
        overview: series.overview,
        popularity: series.popularity,
        poster_path: series.poster_path,
        backdrop_path: series.backdrop_path,
        first_air_date: series.first_air_date?.toISOString(),
        genre_ids: series.genre_ids,
        origin_country: series.origin_country,
        original_language: series.original_language,
        vote_average: series.vote_average,
        vote_count: series.vote_count,
      };
    }
    );
    const dataCount = await Series.count();
    return {
      page: page,
      results: data,
      total_results: dataCount,
      total_pages: Math.ceil(dataCount / 20),

    };
  } catch (error) {
    throw error;
  }
}