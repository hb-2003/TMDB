import { personService } from "../../modules/person/person";
import GuestStar from "../../schema/models/guestStar";
import { IGuestStar } from "../../utils/types";
import { handleError } from "../../utils/error";
import { guestStarResponse } from "../../utils/types";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const guestStarService = async (
  series_id: number,
  season_number: number,
  episode_number: number,
  guestStar: guestStarResponse
): Promise<void> => {
  try {
    if (!guestStar.guest_stars) return;

    const guestStarData: IGuestStar[] = guestStar.guest_stars
      .filter((star) => star.id !== null && star.id !== undefined)
      .map((star) => ({
      series_id,
      season_id: season_number,
      episode_id: episode_number,
      person_id: star.id,
      character: star.character,
      credit_id: star.credit_id,
      order: star.order,
      adult: star.adult,
      }));

    const person_ids: number[] = guestStarData.map((star) => star.person_id);
    const existingGuestStars = await GuestStar.findAll({
      where: { person_id: person_ids },
      attributes: ["person_id"],
    });
    const existingPersonIds = existingGuestStars.map((star) => star.person_id);
    const newGuestStars = guestStarData.filter(
      (star) => !existingPersonIds.includes(star.person_id)
    );
    await personService(newGuestStars.map((star) => star.person_id));
    await GuestStar.bulkCreate(newGuestStars.filter(star => star.person_id !== null));
  } catch (error) {
    await handleError(error, () =>
      guestStarService(series_id, season_number, episode_number, guestStar)
    );
  }
};
