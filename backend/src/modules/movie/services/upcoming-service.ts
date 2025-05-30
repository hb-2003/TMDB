import Movie from "../../../schema/models/movie";
import { Op } from "sequelize";
import {
  DateRange,
  GetMovieUpcomingResponse,
  IMovie,
} from "../../../utils/types";
import Titles from "../../../schema/models/titles";
import Country from "../../../schema/models/country";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const upcomingService = async (
  page: number = 1,
  language: string = "en-US"
): Promise<GetMovieUpcomingResponse> => {
  try {
    if(page == null || page == undefined) {
      throw new CustomGraphqlError(getMessage("PAGE_NOT_NULL"), "PAGE_NOT_NULL");
    }
    const [recommendations, total_results, country]: [
      Movie[],
      number,
      Country[]
    ] = await Promise.all([
      Movie.findAll({
        where: {
          release_date: { [Op.gte]: new Date() },
          status: { [Op.ne]: "Released" },
        },
        order: [["release_date", "ASC"]],
        limit: 20,
        offset: (page - 1) * 20,
      }),
      Movie.count({
        where: {
          release_date: { [Op.gte]: new Date() },
          status: { [Op.ne]: "Released" },
        },
      }),
      Country.findAll(),
    ]);

    if (!recommendations) {
      return {
        dates: { maximum: "", minimum: "" },
        page,
        total_pages: 0,
        total_results: 0,
        results: [],
      };
    }

    const CountryId: string | undefined = country.find(
      (c) => c.iso_3166_1 === language.split("-")[1]
    )?.id;

    const results: IMovie[] = await Promise.all(
      recommendations.map(async (movie): Promise<IMovie> => {
        const title = await Titles.findOne({
          where: { movie_tv_id: movie.id, country_id: CountryId },
        });

        return {
          id: movie.id,
          title: movie.title,
          original_title: title?.title ?? movie.original_title,
          overview: movie.overview,
          genre_ids: movie.genre_ids,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          popularity: movie.popularity,
          adult: movie.adult,
          original_language: movie.original_language,
          poster_path: movie.poster_path ?? "",
          backdrop_path: movie.backdrop_path ?? "",
          video: movie.video,
          release_date: movie.release_date?.toISOString(),
          imdb_id: movie.imdb_id,
          budget: movie.budget,
          revenue: movie.revenue,
          runtime: movie.runtime,
          status: movie.status,
          tagline: movie.tagline,
          homepage: movie.homepage,
          youtube_key: movie.youtube_key,
        };
      })
    );

    const dates: DateRange = {
      maximum:
        recommendations[recommendations.length - 1]?.release_date
          ?.toISOString()
          .split("T")[0] ?? "",
      minimum:
        recommendations[0]?.release_date?.toISOString().split("T")[0] ?? "",
    };
    return {
      dates,
      page,
      total_pages: Math.ceil(total_results / 20),
      total_results,
      results,
    };
  } catch (error) {
    throw error;
  }
};
