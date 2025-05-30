import { SeasonDetail } from "../../../../utils/seasons";
import { CastMemberData, CrewMember } from "../../../../utils/types";
import { SeasonCreditsService } from "../../services";

// export const SeasonService = async (id: number, season_number: number): Promise<SeasonDetail> => {
export const SeasonCredits = async (
  _: unknown,
  { id, season_number }: { id: number; season_number: number }
): Promise<{ crew: CrewMember[], cast: CastMemberData[],id : number}> => {
  try {
    return await SeasonCreditsService(id, season_number);
  } catch (error) {
    throw error;
  }
}