import axios from "../config/axiosConfig";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retryDelay: (retryCount: number, error: any) => {
    return error.response?.status === 429
      ? 3000
      : axiosRetry.exponentialDelay(retryCount);
  },
  retryCondition: (error: any) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response?.status === 429 ||
      error.code === "ECONNRESET" ||
      error.code === "ECONNABORTED" ||
      error.response?.status === 404 ||
      error.response?.status === 500 ||
      error.response?.status === 404
    );
  },
});

const retryableErrors = [
  "ECONNRESET",
  "429",
  "ECONNABORTED",
  "404",
  "500",
  "401",
  "403",
  "400",
];

export async function ErrorHandling(error: unknown): Promise<void> {
  const err = error as { code?: string; response?: { status?: number } };
  if (retryableErrors.includes(String(err.code || err.response?.status))) {
    await delay(3000);
    return ErrorHandling(error);
  } else {
    throw error;
  }
}
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
