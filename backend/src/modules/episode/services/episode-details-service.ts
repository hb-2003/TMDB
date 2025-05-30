import Crew from "../../../schema/models/crew";
import Episode from "../../../schema/models/episodes";
import GuestStar from "../../../schema/models/guestStar";
import People from "../../../schema/models/people";
import CustomGraphqlError from "../../../shared-lib/errors"
import { getMessage } from "../../../utils/message"
import { CrewDetails } from "../../../utils/types";
import { getCrewData } from "../../helper";
import { CrewMember, EpisodeDetails, GuestStarDetails } from "../type";

export const episodeDetailsService = async (seriesId: number, seasonNumber: number, episodeNumber: number): Promise<EpisodeDetails> => {
  if (!seriesId || !seasonNumber || !episodeNumber) {
    throw new CustomGraphqlError(getMessage("INVALID_INPUT"), "INVALID_INPUT");
  }
  try {
    const episode: Episode | null = await Episode.findOne({ where: { series_id: seriesId, season_number: seasonNumber, episode_number: episodeNumber } });
    if (!episode) {
      throw new CustomGraphqlError(getMessage("EPISODE_NOT_FOUND"), "EPISODE_NOT_FOUND");
    }
    const crew: CrewDetails[] = await getCrewData(episode.id, "episode");
    const guestStars: GuestStar[] = await GuestStar.findAll({ where: { series_id: seriesId, season_id: seasonNumber, episode_id: episodeNumber } });
    const CrewDetails: CrewMember[] = crew.map((crewMember: CrewDetails) => {
      return {
        job: crewMember.job || "",
        department: crewMember.department || "",
        credit_id: crewMember.credit_id || "",
        adult: crewMember.adult || false,
        gender: crewMember.gender || 0,
        id: crewMember.id || 0,
        known_for_department: crewMember.known_for_department || "",
        name: crewMember.name || "",
        original_name: crewMember.original_name || "",
        popularity: crewMember.popularity || 0,
        profile_path: crewMember.profile_path || "",
      };
    });
    const guestStarDetails: GuestStarDetails[] = await Promise.all(guestStars.map(async (guestStar: GuestStar) => {
      const people: People | null = await People.findOne({ where: { id: guestStar.person_id } });
      if (!people) {
        throw new CustomGraphqlError(getMessage("PEOPLE_NOT_FOUND"), "PEOPLE_NOT_FOUND");
      }
      return {
        character: guestStar.character,
        credit_id: guestStar.credit_id,
        order: guestStar.order,
        adult: people.adult,
        gender: people.gender,
        id: people.id,
        known_for_department: people.known_for_department,
        name: people.name,
        original_name: people.original_name,
        popularity: people.popularity,
        profile_path: people.profile_path,
      };
    }
    ));
    const episodeDetails: EpisodeDetails = {
      air_date: episode.air_date.toISOString(),
      crew: CrewDetails,
      episode_number: episode.episode_number,
      guest_stars: guestStarDetails,
      name: episode.name,
      overview: episode.overview,
      id: episode.id,
      production_code: episode.production_code,
      runtime: 0,
      season_number: episode.season_number,
      still_path: episode.still_path,
      vote_average: episode.vote_average,
      vote_count: 0,
    };
    return episodeDetails;
  } catch (error) {
    throw error;
  }
}
