import Cast from "../../../schema/models/cast";
import Crew from "../../../schema/models/crew";
import Job, { job } from "../../../schema/models/job";
import People from "../../../schema/models/people";
import Seasons from "../../../schema/models/seasons";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { AggregateCreditsResponse, CastMember, JobData, Role } from "../../../utils/seasons";

// Ensure profile_path is not optional in CrewMemberExtended
type CrewMemberExtended = {
  gender: number;
  id: number;
  adult: boolean;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string; // Changed from string | undefined to string
  credit_id: string;
  department: string;
  job: string;
  jobs: JobData[];
  total_episode_count: number;
};
import { getSeasons, getSeries } from "../../helper";

export const aggregateCreditsService = async (id: number, season_number: number): Promise<AggregateCreditsResponse> => {
  try {
    await getSeries(id);

    if (season_number < 1) {
      throw new CustomGraphqlError(getMessage("SEARCH_SEASON_NUMBER_INVALID"), "SEARCH_SEASON_NUMBER_INVALID");
    }

    const seasons: Seasons | null = await Seasons.findOne({ where: { series_id: id, season_number: season_number } });
    if (!seasons) {
      throw new CustomGraphqlError(getMessage("SEASON_NOT_FOUND"), "SEASON_NOT_FOUND");
    }

    const cast: CastMember[] = await CastMembers(seasons.id);
    const crew: CrewMemberExtended[] = await CrewMemberExtendeds(seasons.id);
    return { cast, crew, id: seasons.id };

  } catch (error) {
    throw error;
  }
}

export const CrewMemberExtendeds = async (id: number): Promise<CrewMemberExtended[]> => {
  try {
    const CrewData: Crew[] | null = await Crew.findAll({ where: { movie_tv_id: id } });
    const jobsData: Job[] | null = await Job.findAll();
    if (!CrewData || !jobsData) {
      throw new CustomGraphqlError(getMessage("CREW_NOT_FOUND"), "CREW_NOT_FOUND");
    }

    const crewMembers = await Promise.all(CrewData.map(async (crew: Crew) => {
      const roles: Role[] = [];
      const jobs: JobData[] = [];
      jobs.push({
        credit_id: crew.credit_id,
        job: await jobsData.find((job: Job) => job.id === crew.job_id)?.job_title || "",
        episode_count: await Crew.count({ where: { movie_tv_id: id, person_id: crew.person_id } })
      });

      const total_episode_count: number = await Crew.count({ where: { movie_tv_id: id, person_id: crew.person_id } });

      const people: People | null = await People.findOne({ where: { id: crew.person_id } });
      if (!people) {
        return null;
      }
      return {
        gender: people.gender,
        id: crew.person_id,
        adult: people.adult,
        known_for_department: people.known_for_department,
        name: people.name,
        original_name: people.original_name,
        popularity: people.popularity,
        profile_path: people.profile_path || undefined,
        credit_id: crew.credit_id,
        department: jobsData.find((job: Job) => job.id === crew.job_id)?.department || "",
        job: jobsData.find((job: Job) => job.id === crew.job_id)?.job_title || "",
        jobs,
        total_episode_count
      };

    }
    ));
    return crewMembers.filter((member): member is CrewMemberExtended => member !== null) as CrewMemberExtended[];
  } catch (error) {
    throw error;
  }
}

export const CastMembers = async (id: number): Promise<CastMember[]> => {
  try {
    const CastData: Cast[] | null = await Cast.findAll({ where: { movie_tv_id: id } });
    if (!CastData) {
      throw new CustomGraphqlError(getMessage("CAST_NOT_FOUND"), "CAST_NOT_FOUND");
    }

    const castMembers = await Promise.all(CastData.map(async (cast: Cast) => {
      const roles: Role[] = [];
      roles.push({
        credit_id: cast.credit_id,
        character: cast.character,
        episode_count: await Cast.count({ where: { movie_tv_id: id, person_id: cast.person_id } })
      });
      const people: People | null = await People.findOne({ where: { id: cast.person_id } });
      if (!people) {
        return null;
      }
      return {
        adult: people.adult,
        gender: people.gender,
        id: cast.person_id,
        known_for_department: people.known_for_department,
        name: people.name,
        original_name: people.original_name,
        popularity: people.popularity,
        profile_path: people.profile_path || "",
        roles: roles,
        total_episode_count: await Cast.count({ where: { movie_tv_id: id, person_id: cast.person_id } }),
        order: cast.order
      };
    }
    ));
    return castMembers.filter((member): member is CastMember => member !== null) as CastMember[];
  } catch (error) {
    throw error;
  }
}
