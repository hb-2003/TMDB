
import { handleError } from "../../utils/error";
import { storeExternalIds } from "../common/external_ids";
import { SeasonExternalIds } from "../../utils/types";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";

export const externalIdsService = async (
  id: number,
  season_number: number,
  type: string
): Promise<void> => {
  try {
    const { data }: { data: SeasonExternalIds } = await axios.get(
      endpoints.seasons.externalIds(id, season_number)
    );

    await storeExternalIds(data, type);
  } catch (error) {
    await handleError(error, () => externalIdsService(id, season_number, type));
  }
}
