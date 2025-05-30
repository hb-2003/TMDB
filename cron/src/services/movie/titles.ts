import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { storeTitles } from "../common/storeTitle";
import { TitlesResponse } from "../../utils/types";

export const movieTilesService = async (movie_tv_id: number): Promise<void> => {
  try {
    const { data } : { data: TitlesResponse } = await axios.get(
      endpoints.movies.alternativeTitles(movie_tv_id)
    );

    await storeTitles(data);
  } catch (error) {
    
    await handleError(error, () => movieTilesService(movie_tv_id));
  }
};
