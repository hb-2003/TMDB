import { ReviewInput } from "../../../../utils/types";
import User from "../../../../schema/models/user";
import { addReviewService } from "../../services";
export const addReview = async (
  _: unknown,
  { input }: { input: ReviewInput },
   context: { req: { user: User } }
): Promise<boolean> => {
  try {
   addReviewService(input, context.req.user);
    return true;
  } catch (error) {
    throw error;
  }
}
