import Image from "../../schema/models/image";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import Series from "../../schema/models/series";
import { ImageResponse, IImage } from "../../utils/types";
import { storeImages } from "../common/image";
import { ErrorHandling } from "../error";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const imageService = async (series_id: number): Promise<void> => {
  try {
    if (!series_id) return;
    const series: Series | null = await Series.findOne({
      where: { id: series_id },
    });

    const { data }: { data: ImageResponse } = await axios.get(
      endpoints.tv.images(1396)
    );

    const types: (keyof ImageResponse)[] = ["backdrops", "posters", "logos"];
    for (const type of types) {
      const images: IImage[] = (Array.isArray(data[type]) ? data[type] : [])
        .slice(0, 10)
        .map((image) => ({
          movie_tv_id: series_id,
          type,
          aspect_ratio: image.aspect_ratio || 0,
          height: image.height || 0,
          iso_639_1: image.iso_639_1 || "",
          vote_average: image.vote_average || 0,
          vote_count: image.vote_count || 0,
          width: image.width || 0,
          file_path: image.file_path,
        }));

      for (const image of images) {
        const existingImage = await Image.findOne({
          where: { movie_tv_id: series_id, file_path: image.file_path },
        });

        if (!existingImage) {
          await storeImages([image]);
        }
      }
    }
  } catch (error) {
    await ErrorHandling(error);
  }
};
