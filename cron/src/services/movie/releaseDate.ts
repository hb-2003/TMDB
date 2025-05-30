import ReleaseDate from "../../schema/models/releaseDate";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { endpoints } from "../../config/endpoints";
import { IReleaseDate, releaseDateResponse } from "../../utils/types";
import Country from "../../schema/models/country";
import Language from "../../schema/models/language";

export const releaseDateService = async (movie_id: number) => {
  try {
    const {
      data: { results },
    } = await axios.get(endpoints.movies.releaseDates(movie_id));
    const languages = await Language.findAll();
    const newReleaseDates = await Promise.all(
      results.map(
        async ({ iso_3166_1, release_dates }: releaseDateResponse) => {
          const country = await Country.findOne({ where: { iso_3166_1 } });
          if (!country) return [];
          const releaseDatePromises = release_dates.map(
            async ({ certification, release_date, type }) => {
              if (
                await ReleaseDate.findOne({
                  where: { movie_id, country_id: country.id, type },
                })
              )
                return null;
              let language: string = "";
              if (iso_3166_1) {
                language =
                  languages.find((lang) => lang.iso_639_1 === iso_3166_1)
                    ?.english_name ?? "";
              }
              return {
                movie_id,
                country_id: country.id,
                release_date,
                certification,
                language,
                type,
              };
            }
          );
          return (await Promise.all(releaseDatePromises)).filter(Boolean);
        }
      )
    );

    const filteredReleaseDates = newReleaseDates.flat();
    await ReleaseDate.bulkCreate(filteredReleaseDates, {
      ignoreDuplicates: true,
    });
  } catch (error) {
    await handleError(error, () => releaseDateService(movie_id));
  }
};
