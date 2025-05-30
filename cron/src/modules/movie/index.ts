import { movieService } from "./movies";
import { upcomingMovie } from "./upcomingMovie";
import { updateMovieService } from "./updateMovie";

const movie = async () => {
  try {
    await Promise.allSettled([
      movieService(),
      updateMovieService(),
      upcomingMovie(),
    ]);
  } catch (error) {
  }
};

export default movie;
