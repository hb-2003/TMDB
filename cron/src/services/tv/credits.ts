
import { personService } from "../../modules/person/person";
import Cast from "../../schema/models/cast";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { storeCredits } from "../../services/common/credits";


const MAX_RETRIES = 5;

interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

interface TVCredits {
  cast: CastMember[];
  crew: CrewMember[];
  id: number;
}

export const creditService = async (id: number): Promise<void> => {
  try {
    const { data }: { data: TVCredits } = await axios.get(
      endpoints.tv.credits(id)
    );
    await storeCredits(data, "tv");
    return;
  } catch (error) {
    await handleError(error, () => creditService(id));
  }
};
