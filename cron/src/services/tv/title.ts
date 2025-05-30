import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { storeTitles } from "../common/storeTitle";
import { TitlesResponse } from "../../utils/types";

export const tvTilesService = async (id: number): Promise<void> => {
  try {
    const { data }: { data: TitlesResponse } = await axios.get(
      endpoints.tv.alternativeTitles(id)
    );

    await storeTitles(data);
  } catch (error) {
    await handleError(error, () => tvTilesService(id));
  }
};
