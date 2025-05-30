import { handleError } from "../../utils/error";
import { storeExternalIds } from "../common/external_ids";
import { EpisodeExternalIds } from "../../utils/types";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";

export const externalIdsService = async (
  id: number,
  season_number: number,
  episode_number: number,
  type: string
): Promise<void> => {
  try {
    const { data }: { data: EpisodeExternalIds } = await axios.get(
      endpoints.episodes.externalIds(id, season_number, episode_number)
    );
    await storeExternalIds(data, type);
  } catch (error) {
    await handleError(error, () =>
      externalIdsService(id, season_number, episode_number, type)
    );
  }
};
