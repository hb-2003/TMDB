import Image from "../../schema/models/image";
import { IImage } from "../../utils/types";
import { handleError } from "../../utils/error";
export const storeImages = async (images: IImage[]): Promise<void> => {
  try {
    await Image.bulkCreate(images.slice(0, 10), { ignoreDuplicates: true });
  } catch (error) {
    await handleError(error, () => storeImages(images));
  }
};
