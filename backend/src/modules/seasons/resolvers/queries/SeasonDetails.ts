import { SeasonDetail } from "../../../../utils/seasons";
import { SeasonDetailsService } from "../../services";

// export const SeasonService = async (id: number, season_number: number): Promise<SeasonDetail> => {
export const SeasonDetails = async (
  _: unknown,
  { id, season_number }: { id: number; season_number: number }
): Promise<SeasonDetail> => {
  try {
    return await SeasonDetailsService(id, season_number);
  } catch (error) {
    throw error;
  }
}