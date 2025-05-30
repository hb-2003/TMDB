
import Cast from "../../../schema/models/cast";
import Episode from "../../../schema/models/episodes";
import GuestStar from "../../../schema/models/guestStar";
import People from "../../../schema/models/people";
import CustomGraphqlError from "../../../shared-lib/errors"
import { getMessage } from "../../../utils/message"
import { CrewDetails } from "../../../utils/types";
import { getCrewData } from "../../helper";
import { CastDetails, creditsResponse, CrewMember, EpisodeDetails, GuestStarDetails } from "../type";

export const episodeCreditsService = async (seriesId: number, seasonNumber: number, episodeNumber: number): Promise<creditsResponse> => {
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

    const cast: Cast[] | null = await Cast.findAll({ where: { movie_tv_id: seriesId, type: "episode" } });
    const CastDetails: CastDetails[] = await Promise.all(cast.map(async (castMember: Cast) => {
      const people: People | null = await People.findOne({ where: { id: castMember.id } });
      if (!people) {
        throw new CustomGraphqlError(getMessage("PEOPLE_NOT_FOUND"), "PEOPLE_NOT_FOUND");
      }
      return {
        character: castMember.character,
        credit_id: castMember.credit_id,
        order: castMember.order,
        adult: people.adult,
        gender: people.gender,
        id: people.id,
        known_for_department: people.known_for_department,
        name: people.name,
        original_name: people.original_name,
        popularity: people.popularity,
        profile_path: people.profile_path,
      };
    })) || [];
    return {
      id: episode.id,
      cast: CastDetails,
      crew: CrewDetails,
      guest_stars: guestStarDetails,
    };
  } catch (error) {
    throw new CustomGraphqlError(getMessage("INTERNAL_SERVER_ERROR"), "INTERNAL_SERVER_ERROR");
  }
};