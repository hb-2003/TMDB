import { deleteReviewService } from "../../services"
import User from "../../../../schema/models/user";
export const deleteReview = async (
  _: unknown,
  { id,media_type }: { id: string , media_type: "movie" | "tv" },
  context: { req: { user: User } }
): Promise<boolean> => {
  try {
    return deleteReviewService(context.req.user.id, id, media_type);
  } catch (error) {
    throw error;
  }
}