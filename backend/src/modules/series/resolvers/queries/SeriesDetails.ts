import { SeriesDetails } from "../../../../utils/types";
import { SeriesDetailsService } from "../../services";



export const SeriesDetail = async (
  _: unknown,
  { id }: { id: number }
): Promise<SeriesDetails> => {
  try {
    return SeriesDetailsService(id);
  } catch (error) {
    throw error;
  }
};
