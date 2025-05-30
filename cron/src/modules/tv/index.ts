import { seriesService } from "./series";
import { handleError } from "../../utils/error";
import { seriesUpdateService } from "./seriesUpdate";
const tv = async () => {
  try {
    await seriesService();
    await seriesUpdateService();
  } catch (error) {
    await handleError(error, () => tv());
  }
};

export default tv;
