import Movie from "../../schema/models/movie";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";

import { updateService } from "../../services/movie/update";
import { handleError } from "../../utils/error";
import { IChanges, IResponseData } from "../../utils/types";

export const updateMovieService = async (): Promise<void> => {
  let page: number = 1;
  let total_pages: number = 1;
  while (page <= total_pages && page <= 500) {
    try {
      if (page > 500) {
        break;
      }
      const response: { data: IResponseData } = await axios.get(
        endpoints.changes.movie(page)
      );
      const data: IResponseData = response.data;
      page = data.page;
      total_pages = data.total_pages;
      const results: IChanges[] = data.results;

      for (const result of results) {
        const movie: Movie | null = await Movie.findByPk(result.id);
        if (movie) {
          await updateService(result.id);
        }
      }
    } catch (error) {
      await handleError(error, () => updateMovieService());
    }
    page++;
  }
};
