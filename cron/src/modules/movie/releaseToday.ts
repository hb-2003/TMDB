import Movie from "../../schema/models/movie";

export const releaseToday = async (): Promise<void> => {
  try {
    const today : string = new Date().toISOString().split("T")[0];
    const movies : Movie[] = await Movie.findAll({
      where: {
        release_date: today,
      },
    });

    if (movies.length > 0) {
      for (const movie of movies) {
        await movie.update({ status: "Released" });
      }
    } else {
    }
  } catch (error) {
    
  }
};
