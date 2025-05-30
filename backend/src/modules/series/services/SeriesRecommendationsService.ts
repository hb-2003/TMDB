import Series from "../../../schema/models/series";
import { GetSeriesRecommendationsResponse, SeriesData } from "../../../utils/types";

export const SeriesRecommendationsService = async (
  id: number,
  page: number,
): Promise<GetSeriesRecommendationsResponse> => {
  try {
    const series = await Series.findOne({ where: { id } });
    if (!series) throw new Error("Series not found");

    const genreFilter = { genre_ids: series.genre_ids };
    const [recommendations, recommendationsCount, total_results] = await Promise.all([
      Series.findAll({ where: genreFilter, limit: 20, offset: (page - 1) * 20 }),
      Series.count({ where: genreFilter }),
      Series.count({ where: genreFilter })
    ]);

    const results: SeriesData[] = recommendations.map((s: Series) => ({
      id: s.id,
      name: s.name,
      original_name: s.original_name,
      overview: s.overview,
      genre_ids: s.genre_ids,
      vote_average: s.vote_average,
      vote_count: s.vote_count,
      popularity: s.popularity,
      original_language: s.original_language,
      poster_path: s.poster_path ?? "",
      backdrop_path: s.backdrop_path ?? "",
      first_air_date: s.first_air_date?.toISOString() ?? "",
      origin_country: s.origin_country,
    }));

    return {
      page,
      total_results,
      total_pages: Math.ceil(recommendationsCount / 20),
      results,
    };
  } catch (error) {
    throw error;
  }
}
