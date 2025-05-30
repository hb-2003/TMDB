
import { handleError } from "../../utils/error";
import { storeExternalIds } from "../common/external_ids";
import { TvExternalIds } from "../../utils/types";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";

export const externalIdsService = async (
  id: number,
  type: string
): Promise<void> => {
  try {
    const { data }: { data: TvExternalIds } = await axios.get(
      endpoints.tv.externalIds(id)
    );

    await storeExternalIds(data, type);
  } catch (error) {
    await handleError(error, () => externalIdsService(id, type));
  }
};
