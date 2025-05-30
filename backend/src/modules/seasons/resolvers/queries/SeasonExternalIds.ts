import { SeasonDetail, SeasonExternalIds as ids } from "../../../../utils/seasons";
import { SeasonDetailsService, SeasonExternalIdsService } from "../../services";

// export const SeasonService = async (id: number, season_number: number): Promise<SeasonDetail> => {
export const SeasonExternalIds = async (
  _: unknown,
  { id, season_number }: { id: number; season_number: number }
): Promise<ids> => {
  try {
    return await SeasonExternalIdsService(id, season_number);
  } catch (error) {
    throw error;
  }
}