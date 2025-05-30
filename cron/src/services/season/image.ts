import Image from "../../schema/models/image";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import Series from "../../schema/models/series";
import { ImageResponse, IImage } from "../../utils/types";
import { storeImages } from "../common/image";


export const imageService = async (
  series_id: number,
  season_number: number
): Promise<void> => {
  try {
    const series = await Series.findOne({ where: { id: series_id } });
    if (!series) return;

    const { data }: { data: ImageResponse } = await axios.get(
      endpoints.seasons.images(series_id, season_number)
    );

    const types: (keyof ImageResponse)[] = ["backdrops", "posters", "logos"];

    for (const type of types) {
      const images: IImage[] = Array.isArray(data[type])
        ? data[type].slice(0, 10)
        : [];
      await storeImages(images);
    }
  } catch (error) {
    await handleError(error, () => imageService(series_id, season_number));
  }
};
