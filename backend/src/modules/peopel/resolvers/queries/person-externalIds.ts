import { personExternalIdsService } from "../../services";
import { ExternalIdsData } from "../../services/type";

export const personExternalIds = async (
  _: any,
  { id }: { id: number }
): Promise<ExternalIdsData> => {
  try {
    return await personExternalIdsService(id);
  } catch (error) {
    throw error;
  }
}