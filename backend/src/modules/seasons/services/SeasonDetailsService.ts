import e from 'express';
import Episode from '../../../schema/models/episodes';
import GuestStar from '../../../schema/models/guestStar';
import People from '../../../schema/models/people';
import Seasons from '../../../schema/models/seasons';
import Series from '../../../schema/models/series';
import CustomGraphqlError from '../../../shared-lib/errors';
import { getMessage } from '../../../utils/message';
import { CrewMember, GuestStar as Guest, SeasonDetail } from '../../../utils/seasons';
import { getCrewData } from '../../helper';
import Crew from '../../../schema/models/crew';
import Job from '../../../schema/models/job';

export const SeasonDetailsService = async (id: number, season_number: number): Promise<SeasonDetail> => {
  try {
    const series: Series | null = await Series.findOne({
      where: { id: id },
    });
    if (!series) {
      throw new CustomGraphqlError(getMessage('SERIES_NOT_FOUND'), 'SERIES_NOT_FOUND');
    }
    const season: Seasons | null = await Seasons.findOne({
      where: { series_id: id, season_number: season_number },
    });

    if (!season) {
      throw new CustomGraphqlError(getMessage('SEASON_NOT_FOUND'), 'SEASON_NOT_FOUND');
    }

    const episodes: Episode[] = await Episode.findAll({
      where: { series_id: id, season_number: season_number },
    });

    if (episodes.length === 0) {
      throw new CustomGraphqlError(getMessage('EPISODE_NOT_FOUND'), 'EPISODE_NOT_FOUND');
    }
    return {
      air_date: season.air_date.toISOString(),
      episode_count: season.episode_count,
      id: season.id,
      name: season.name,
      overview: season.overview,
      poster_path: season.poster_path,
      season_number: season.season_number,
      vote_average: series.vote_average,
      show_id: series.id,
      episodes: await Promise.all(episodes.map(async (episode: Episode) => {
        return {
          air_date: episode.air_date.toISOString(),
          episode_number: episode.episode_number,
          id: episode.id,
          name: episode.name,
          overview: episode.overview,
          production_code: episode.production_code,
          season_number: episode.season_number,
          still_path: episode.still_path,
          vote_average: episode.vote_average,
          vote_count: series.vote_count,
          crew: (await getCrewData(episode.id, 'episode')).map(crew => ({
            ...crew,
            gender: crew.gender !== undefined ? crew.gender : 0,
          })),
          guest_stars: await guest_stars(id, season_number, episode.episode_number),
          episode_type: episode.episode_type,
          runtime:0,
          show_id: episode.series_id,
        };
      })),
    };
  } catch (error) {
    throw error;
  }
}

export const guest_stars = async (id: number, season_number: number, episode_number: number): Promise<Guest[]> => {
  try {
    const guest_stars: GuestStar[] = await GuestStar.findAll({
      where: { series_id: id, season_id: season_number, episode_id: episode_number },
    });
    if (guest_stars.length === 0) {
      return [];
    }
    return await Promise.all(guest_stars.map(async (guest_star: GuestStar) => {
      const people: People | null = await People.findOne({
        where: { id: guest_star.person_id },
      });
      if (!people) {
        throw new CustomGraphqlError(getMessage('PEOPLE_NOT_FOUND'), 'PEOPLE_NOT_FOUND');
      }
      return {
        character: guest_star.character,
        credit_id: guest_star.credit_id,
        order: guest_star.order,
        adult: guest_star.adult,
        gender: people?.gender ?? 0,
        id: people?.id,
        known_for_department: people?.known_for_department,
        name: people?.name,
        original_name: people?.original_name,
        popularity: people?.popularity,
        profile_path: people?.profile_path,
      };
    }));
  } catch (error) {
    throw error;
  }
}

export const getCrewMembers = async (id: number): Promise<CrewMember[]> => {
  try {
    const crew_members: Crew[] | null = await Crew.findAll({
      where: { id: id, type: 'episode' },
    });
    if (crew_members.length === 0) {
      return [];
    }
    return await Promise.all(crew_members.map(async (crew_member: Crew) => {
      const person: People | null = await People.findOne({
        where: { id: crew_member.person_id },
      });
      if (!person) {
        throw new CustomGraphqlError(getMessage('PEOPLE_NOT_FOUND'), 'PEOPLE_NOT_FOUND');
      }
      const job: Job | null = await Job.findOne({
        where: { id: crew_member.job_id },
      });
      return {
        job: job?.job_title ?? '',
        department: job?.department ?? '',
        credit_id: crew_member.credit_id,
        adult: crew_member.adult,
        gender: person.gender !== undefined ? person.gender : 0,
        id: person.id,
        known_for_department: person.known_for_department,
        name: person.name,
        original_name: person.original_name,
        popularity: person.popularity,
        profile_path: person.profile_path,
      };
    }));
  } catch (error) {
    throw error;
  }
}