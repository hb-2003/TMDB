import Cast from "../../../schema/models/cast";
import Crew from "../../../schema/models/crew";
import Job from "../../../schema/models/job";
import People from "../../../schema/models/people";
import Seasons from "../../../schema/models/seasons";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { getSeries } from "../../helper";
import { CastMemberData, CrewMember } from "../../../utils/types";
import { compareSync } from "bcrypt";

export const SeasonCreditsService = async (id: number, season_number: number): Promise<{ crew: CrewMember[], cast: CastMemberData[], id: number }> => {
  try {

    await getSeries(id);
    const season: Seasons | null = await Seasons.findOne({
      where: {
        series_id: id,
        season_number: season_number,
      },
    });
    if (!season) {
      throw new CustomGraphqlError(getMessage("SEASON_NOT_FOUND"), "SEASON_NOT_FOUND");
    }
    const casts: Cast[] | null = await Cast.findAll({
      where: {
        movie_tv_id: season.id,
      },
    });
    const crews: Crew[] | null = await Crew.findAll({
      where: {
        movie_tv_id: season.id,
      },
    });

    const crewData: CrewMember[] = [];
    const castData: CastMemberData[] = [];

    await Promise.all(casts.map(async (cast) => {
      const people: People | null = await People.findOne({
        where: {
          id: cast.person_id
        },
      });
      if (people) {
        castData.push({
          adult: people.adult,
          gender: people.gender,
          id: people.id,
          known_for_department: people.known_for_department,
          name: people.name,
          original_name: people.original_name,
          popularity: people.popularity,
          profile_path: people.profile_path,
          total_episode_count: await Cast.count({
            where: {
              movie_tv_id: id,
              person_id: cast.person_id,
            },
          }),
          order: cast.order,
        });
      }
    }));

    await Promise.all(crews.map(async (crew) => {
      if (!crew.job_id) {
        return;
      }
      const job: Job | null = await Job.findOne({
        where: {
          id: crew.job_id
        },
      });
      const people: People | null = await People.findOne({
        where: {
          id: crew.person_id
        },
      });
      if (people && job) {
        crewData.push({
          job: job.job_title,
          department: job.department,
          credit_id: crew.credit_id,
          adult: people.adult,
          gender: people.gender,
          id: people.id,
          known_for_department: people.known_for_department,
          name: people.name,
          original_name: people.original_name,
          popularity: people.popularity,
          profile_path: people.profile_path,
        });
      }
    }));

    return {
      cast: castData,
      crew: crewData,
      id: season.id,
    };

  } catch (error) {
    throw error;
  }
};
