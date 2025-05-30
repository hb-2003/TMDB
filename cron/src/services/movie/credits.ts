import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { storeCredits } from "../../services/common/credits";
import { TVCredits } from "../../utils/types";

export const creditService = async (id: number): Promise<void> => {
  try {
    const { data }: { data: TVCredits } = await axios.get(
      endpoints.movies.credits(id)
    );
    await storeCredits(data, "movie");

    return;
  } catch (error) {
    
    await handleError(error, () => creditService(id));
  }
};
