import { ReviewResponse } from "../../../../utils/types";
import { reviewService } from "../../services";

export const getReview = async (
  _: unknown,
  { id, page }: { id: number; page: number }
): Promise<ReviewResponse> => {
  try {
    return reviewService(id, page);
  } catch (error) {
    throw error;
  }
}