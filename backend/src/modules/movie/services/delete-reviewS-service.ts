import Review, { review } from "../../../schema/models/review";
import { deleteReview } from "../../helper";


export const deleteReviewService = async (
  userId: string,
  reviewId: string,
  media_type: "movie" | "tv"
): Promise<boolean> => {
  try {
    return deleteReview(userId, reviewId, media_type);
  } catch (error) {
    throw error;
  }
};