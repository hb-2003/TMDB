import User from "../../../../schema/models/user";
import { ratedService } from "../../services";

export const userRated = async (
  _: unknown,
  { movie_id, value, media_type }: { movie_id: number; value: number, media_type: "movie" | "tv" },
  context: { req: { user: User } }
): Promise<boolean> => {
  try {
    return ratedService(context.req.user.id, movie_id, value, media_type);
  } catch (error) {
    throw error;
  }
};
