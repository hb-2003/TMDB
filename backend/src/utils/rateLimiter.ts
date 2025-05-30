import { RateLimiterMemory } from "rate-limiter-flexible";
import CustomGraphqlError from "../shared-lib/errors";

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 1, // per 1 second
});
const check = async (key: string) => {
  try {
    await rateLimiter.consume(key);
  } catch (rejRes) {
    throw new CustomGraphqlError("Too many requests", "TOO_MANY_REQUESTS");
  }
};

export default {
  check,
};
