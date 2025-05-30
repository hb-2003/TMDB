import { handleError } from "../../utils/error";
import Titles, { ITitles } from "../../schema/models/titles";
import Country, { ICountries } from "../../schema/models/country";
import { title, TitlesResponse } from "../../utils/types";

export const storeTitles = async (data: TitlesResponse): Promise<void> => {
  try {
    const countries: ICountries[] = await Country.findAll();
    if (!data || !data.results || !Array.isArray(data.results)) {
      return;
    }
    const titles: ITitles[] = data.results.map((title: title) => ({
      movie_tv_id: data.id,
      title: title.title,
      type: title.type,
      country_id:
        countries.find(
          (country: ICountries) => country.iso_3166_1 === title.iso_3166_1
        )?.id || "",
    }));

    await Titles.bulkCreate(titles);
  } catch (error) {
    await handleError(error, () => storeTitles(data));
  }
};
