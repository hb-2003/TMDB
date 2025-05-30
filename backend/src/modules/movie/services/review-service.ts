import { ReviewDetails, ReviewResponse } from "../../../utils/types";
import Review from "../../../schema/models/review";
import User from "../../../schema/models/user";
import CustomGraphqlError from "../../../shared-lib/errors";
import { getMessage } from "../../../utils/message";

export const reviewService = async (
  id: number,
  page: number
): Promise<ReviewResponse> => {
  try {
    const reviews: Review[] = await Review.findAll({
      where: {
        media_id: id,
      },
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ["id", "rating", "reviewText", "createdAt", "updatedAt", "user_id"],
    });

    const totalReviews = await Review.count({
      where: {
        media_id: id,
      },
    });

    const reviewList: ReviewDetails[] = await Promise.all(
      reviews.map(async (review) => {
        return {
          username: await getUsername(review.user_id),
          reviewText: review.reviewText,
          rating: review.rating,
          reviewDate: review.createdAt.toISOString(),
        };
      })
    );

    const totalPages = Math.ceil(totalReviews / 20);
    const response: ReviewResponse = {
      page: page,
      results: {
        movie_id: id,
        review: reviewList,
      },
      total_pages: totalPages,
      total_results: totalReviews,
    };
    return response;
  } catch (error) {
    throw new CustomGraphqlError(
      getMessage("INTERNAL_SERVER_ERROR"),
      "INTERNAL_SERVER_ERROR"
    );
  }
};

const getUsername = async (id: string): Promise<string> => {
  try {
    const user: User | null = await User.findOne({
      where: {
        id: id,
      },
      attributes: ["username"],
    });
    if (!user) {
      throw new CustomGraphqlError(
        getMessage("USER_NOT_FOUND"),
        "USER_NOT_FOUND"
      );
    }
    return user.username;
  } catch (error) {
    throw new CustomGraphqlError(
      getMessage("INTERNAL_SERVER_ERROR"),
      "INTERNAL_SERVER_ERROR"
    );
  }
};
