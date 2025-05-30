import { endpoints } from "../../config/endpoints";
import Countries from "../../schema/models/country";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";



export const countriesService = async () => {
  try {
    const { data }: { data: Countries[] } = await axios.get(
      endpoints.configuration.countries,
      { timeout: 5000 }
    );

    const countryData: {
      iso_3166_1: string;
      english_name: string;
      native_name: string;
    }[] = data.map((country) => {
      return {
        iso_3166_1: country.iso_3166_1,
        english_name: country.english_name,
        native_name: country.native_name,
      };
    });
    await Countries.bulkCreate(countryData);
  } catch (error) {
    await handleError(error, () => countriesService());
  }
};
