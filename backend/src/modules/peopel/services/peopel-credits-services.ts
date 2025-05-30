import Cast from "../../../schema/models/cast";
import Crew from "../../../schema/models/crew";
import Job from "../../../schema/models/job";
import Movie from "../../../schema/models/movie";
import People from "../../../schema/models/people";
import Series from "../../../schema/models/series";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { MediaDetail, PersonCredits } from "./type";

export const peopleCreditsService = async (peopleId: number): Promise<PersonCredits> => {
  try {
    const people: People | null = await People.findOne({ where: { id: peopleId } });
    if (!people) {
      throw new CustomGraphqlError(getMessage("PEOPLE_NOT_FOUND"), "PEOPLE_NOT_FOUND");
    }

    const castMovie: Cast[] = await Cast.findAll({ where: { person_id: peopleId } });
    const castDetails: MediaDetail[] = (
      await Promise.all(
        castMovie.map(async (cast: Cast): Promise<MediaDetail | undefined> => {
          if (cast.type === "movie") {
            const movie: Movie | null = await Movie.findOne({ where: { id: cast.movie_tv_id } });
            if (!movie) return undefined;

            return {
              id: movie.id,
              title: movie.title,
              adult: movie.adult,
              backdrop_path: movie.backdrop_path,
              genre_ids: movie.genre_ids,
              original_language: movie.original_language,
              original_title: movie.original_title,
              overview: movie.overview,
              popularity: movie.popularity,
              poster_path: movie.poster_path,
              release_date: movie.release_date ? movie.release_date.toISOString() : "",
              video: movie.video,
              vote_average: movie.vote_average,
              vote_count: movie.vote_count,
              character: cast.character,
              credit_id: cast.credit_id,
              order: cast.order,
              media_type: cast.type,
            };
          }

          if (cast.type === "tv") {
            const tv: Series | null = await Series.findOne({ where: { id: cast.movie_tv_id } });
            if (!tv) return undefined;

            return {
              id: tv.id,
              title: tv.name,
              adult: false,
              backdrop_path: tv.backdrop_path,
              genre_ids: tv.genre_ids,
              original_language: tv.original_language,
              original_title: tv.original_name,
              overview: tv.overview,
              popularity: tv.popularity,
              poster_path: tv.poster_path,
              release_date: tv.first_air_date ? tv.first_air_date.toISOString() : "",
              video: false,
              vote_average: tv.vote_average,
              vote_count: tv.vote_count,
              character: cast.character,
              credit_id: cast.credit_id,
              order: cast.order,
              media_type: cast.type,
            };
          }
        })
      )
    ).filter((detail): detail is MediaDetail => detail !== undefined);

    const crew: Crew[] = await Crew.findAll({ where: { person_id: peopleId } });
    console.log(crew);
    const crewDetails: MediaDetail[] = (
      await Promise.all(
        crew.map(async (crewMember: Crew): Promise<MediaDetail | undefined> => {
          if (crewMember.type === "movie") {
            const movie: Movie | null = await Movie.findOne({ where: { id: crewMember.movie_tv_id } });
            if (!movie) return undefined;

            const job: Job | null = await Job.findOne({ where: { id: crewMember.job_id } });
            const character = job ? job.job_title : "";

            return {
              id: movie.id,
              title: movie.title,
              adult: movie.adult,
              backdrop_path: movie.backdrop_path,
              genre_ids: movie.genre_ids,
              original_language: movie.original_language,
              original_title: movie.original_title,
              overview: movie.overview,
              popularity: movie.popularity,
              poster_path: movie.poster_path,
              release_date: movie.release_date ? movie.release_date.toISOString() : "",
              video: movie.video,
              vote_average: movie.vote_average,
              vote_count: movie.vote_count,
              character,
              credit_id: crewMember.credit_id,
              order: 0,
              media_type: crewMember.type,
            };
          }

          if (crewMember.type === "tv") {
            const tv: Series | null = await Series.findOne({ where: { id: crewMember.movie_tv_id } });
            if (!tv) return undefined;

            const job: Job | null = await Job.findOne({ where: { id: crewMember.job_id } });
            const character = job ? job.job_title : "";

            return {
              id: tv.id,
              title: tv.name,
              adult: false,
              backdrop_path: tv.backdrop_path,
              genre_ids: tv.genre_ids,
              original_language: tv.original_language,
              original_title: tv.original_name,
              overview: tv.overview,
              popularity: tv.popularity,
              poster_path: tv.poster_path,
              release_date: tv.first_air_date ? tv.first_air_date.toISOString() : "",
              video: false,
              vote_average: tv.vote_average,
              vote_count: tv.vote_count,
              character,
              credit_id: crewMember.credit_id,
              order: 0,
              media_type: crewMember.type,
            };
          }
        })
      )
    ).filter((detail): detail is MediaDetail => detail !== undefined);

    return {
      id: people.id,
      cast: castDetails,
      crew: crewDetails,
    };
  } catch (error) {
    throw error;
  }
};
