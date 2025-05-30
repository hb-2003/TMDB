import { handleError } from "../../utils/error";
import { storeExternalIds } from "../../services/common/external_ids";
import { PersonExternalIds } from "../../utils/types";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";

export const externalIdsService = async (
  id: number,
  type: string
): Promise<void> => {
  try {
    const { data }: { data: PersonExternalIds } = await axios.get(
      endpoints.people.externalIds(id)
    );

    await storeExternalIds(data, type);
  } catch (error) {
    await handleError(error, () => externalIdsService(id, type));
  }
}
