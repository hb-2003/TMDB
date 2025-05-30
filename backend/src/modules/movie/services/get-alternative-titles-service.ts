import Country from "../../../schema/models/country";
import Titles from "../../../schema/models/titles";

export interface AlternativeTitle {
  iso_3166_1: string;
  title: string;
  type?: string;
}

export interface GetAlternativeTitlesResponse {
  id: number;
  titles: AlternativeTitle[];
}


export const getAlternativeTitlesService = async (id: number): Promise<GetAlternativeTitlesResponse> => {
  try {
    const countries : Country[] = await Country.findAll();
    const titles : Titles[] = await Titles.findAll({
      where: {
        movie_tv_id: id
      },
    });
    const alternativeTitles: AlternativeTitle[] = [];
    titles.forEach((title) => {
      const country = countries.find((country) => country.dataValues.id === title.dataValues.country_id);
      if (country) {
        alternativeTitles.push({
          iso_3166_1: country.dataValues.iso_3166_1,
          title: title.dataValues.title,
          type: title.dataValues.type
        });
      }
    }
    );
    return { id, titles: alternativeTitles };
  } catch (error) {
    throw error;
  }
}