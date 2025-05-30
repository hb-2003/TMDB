import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { ImageResponse, IImage } from "../../utils/types";
import { storeImages } from "../common/image";

export const imageService = async (id: number): Promise<void> => {
  try {
    const { data }: { data: ImageResponse } = await axios.get(
      endpoints.movies.images(id)
    );

    const types: (keyof ImageResponse)[] = ["backdrops", "posters", "logos"];

    for (const type of types) {
      const images: IImage[] = Array.isArray(data[type])
        ? data[type].map((image) => ({
            ...image,
            movie_tv_id: id,
            type,
          }))
        : [];
      await storeImages(images);
    }
  } catch (error) {
    
    await handleError(error, () => imageService(id));
  }
};
