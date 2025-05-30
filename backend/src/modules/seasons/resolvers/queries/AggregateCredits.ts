import { AggregateCreditsResponse, SeasonDetail } from "../../../../utils/seasons";
import { CastMemberData, CrewMember } from "../../../../utils/types";
import { aggregateCreditsService} from "../../services";

// export const SeasonService = async (id: number, season_number: number): Promise<SeasonDetail> => {
export const AggregateCredits = async (
  _: unknown,
  { id, season_number }: { id: number; season_number: number }
): Promise<AggregateCreditsResponse> => {
  try {
    return await aggregateCreditsService(id, season_number);
  } catch (error) {
    throw error;
  }
}