import User from "../../../schema/models/user";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";
import { ReviewInput, ReviewMovieInput } from "../../../utils/types";
import { storeReview } from "../../helper";

export const addReviewService = async (
  input: ReviewInput,
  user: User
): Promise<boolean> => {
  try {
    return await storeReview(input, user.id);
  }
  catch (error) {
    throw error;
  }
}