import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import Series from "../../schema/models/series";
import { ImageResponse, IImage } from "../../utils/types";
import { storeImages } from "../common/image";
import { handleError } from "../../utils/error";

export const imageService = async (
  series_id: number,
  season_number: number,
  episode_number: number
): Promise<void> => {
  try {
    const series = await Series.findOne({ where: { id: series_id } });
    if (!series) return console.error(`Series with ID ${series_id} not found.`);

    const { data }: { data: ImageResponse } = await axios.get(
      endpoints.episodes.images(series_id, season_number, episode_number)
    );
    if (!data)
      return console.error(
        `No image data found for series_id ${series_id}, season ${season_number}, episode ${episode_number}.`
      );

    const types: (keyof ImageResponse)[] = ["backdrops", "posters", "logos"];
    for (const type of types) {
      const images: IImage[] = Array.isArray(data[type])
        ? data[type].slice(0, 10)
        : [];
      if (images.length > 0) {
        await storeImages(
          images.map((image: IImage) => ({
            movie_tv_id: series_id,
            type,
            aspect_ratio: image.aspect_ratio || 0,
            height: image.height || 0,
            iso_639_1: image.iso_639_1 || "",
            vote_average: image.vote_average || 0,
            vote_count: image.vote_count || 0,
            width: image.width || 0,
            file_path: image.file_path,
          }))
        );
      }
    }
  } catch (error) {
    await handleError(error, () =>
      imageService(series_id, season_number, episode_number)
    );
  }
};
