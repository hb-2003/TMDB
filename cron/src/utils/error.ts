import e from "express";

export const handleFileError = (error: Error & { code?: string }): void => {
  if (["ENOENT", "EACCES", "EPERM"].includes(error.code ?? "")) {
    console.error(`File handling error: ${error.message}`);
  } else {
    console.error(`Unexpected error: ${error.message}`);
  }
};

export const handleError = async (
  error: any,
  retryCallback: () => Promise<void>
): Promise<void> => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  if (error.response?.status === 429) {
    const retryAfter = error.response.headers["retry-after"]
      ? parseInt(error.response.headers["retry-after"], 10) * 1000
      : 3000;
    await delay(retryAfter);
    return retryCallback();
  } else if (error.code === "ECONNRESET") {
    await delay(3000);
    return retryCallback();
  } else if (["ENOENT", "EACCES", "EPERM"].includes(error.code)) {
    handleFileError(error);
  } else {
    throw error;
  }
};
