import People from "../../../schema/models/people";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { PersonDetails } from "./type";

export const peopleDetailsService = async (peopleId: number): Promise<PersonDetails> => {
  try {
    const people: People | null = await People.findOne({ where: { id: peopleId } });
    if (!people) {
      throw new CustomGraphqlError(getMessage("PEOPLE_NOT_FOUND"), "PEOPLE_NOT_FOUND");
    }
    
    return {
      id: people.id,
      adult: people.adult,
      biography: people.biography,
      birthday: people.birthday ? people.birthday.toISOString() : null,
      deathday: people.deathday ? people.deathday.toISOString() : null,
      gender: people.gender,
      homepage: people.homepage,
      imdb_id: people.imdb_id,
      known_for_department: people.known_for_department,
      name: people.name,
      place_of_birth: people.place_of_birth,
      popularity: people.popularity,
      profile_path: people.profile_path
    };
  } catch (error) {
    throw new CustomGraphqlError(getMessage("INTERNAL_SERVER_ERROR"), "INTERNAL_SERVER_ERROR");
  }
};
      