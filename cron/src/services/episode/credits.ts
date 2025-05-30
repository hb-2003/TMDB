
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { storeCredits } from "../../services/common/credits";

import { TVCredits } from "../../utils/types";
const MAX_RETRIES = 5;


export const creditService = async (
  series_id: number,
  season_number: number,
  episode_number: number
): Promise<void> => {
  try {
    const { data }: { data: TVCredits } = await axios.get(
      endpoints.episodes.credits(series_id, season_number, episode_number)
    );
    await storeCredits(data, "episode");

    return;
  } catch (error) {
    await handleError(error, () =>
      creditService(series_id, season_number, episode_number)
    );
  }
};
