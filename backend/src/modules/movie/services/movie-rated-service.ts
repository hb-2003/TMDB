
import { storeRate } from "../../helper";

export const ratedService = async (
  userId: string,
  movieId: number,
  rating: number,
  media_type: "movie" | "tv"
): Promise<boolean> => {
  try {
    return storeRate(userId, movieId, media_type, rating);
  } catch (error) {
    throw error;
  }
};
