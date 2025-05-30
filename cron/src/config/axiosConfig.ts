import axios from "axios";

import axiosRetry from "axios-retry";
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount, error) =>
    error.response?.status === 429
      ? 60000
      : axiosRetry.exponentialDelay(retryCount),
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response?.status === 429 ||
      (error.code && ["ECONNRESET", "ECONNABORTED"].includes(error.code)) ||
      false
    );
  },
});

export default axios;
