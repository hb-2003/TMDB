import Episode from "../../../schema/models/episodes";
import Image from "../../../schema/models/image";
import { GetImagesResponse, ImageDetails } from "../type";

export const episodeImagesService = async (
  seriesId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<GetImagesResponse> => {
  try {

    const episode: Episode | null = await Episode.findOne({ where: { series_id: seriesId, season_number: seasonNumber, episode_number: episodeNumber } });

    if (!episode) {
      throw new Error("Episode not found");
    }

    console.log(episode.id);

    const images: Image[] = await Image.findAll({ where: { movie_tv_id: episode.id } });
    console.log(images);
    const backdrops: ImageDetails[] = images.filter((image) => image.type === "backdrops").map((image) => {
      return {
        aspect_ratio: image.aspect_ratio,
        height: image.height,
        file_path: image.file_path,
        vote_average: image.vote_average,
        vote_count: image.vote_count,
        width: image.width
      };
    });

    const posters: ImageDetails[] = images.filter((image) => image.type === "posters").map((image) => {
      return {
        aspect_ratio: image.aspect_ratio,
        height: image.height,
        file_path: image.file_path,
        vote_average: image.vote_average,
        vote_count: image.vote_count,
        width: image.width
      };
    });

    const logos: ImageDetails[] = images.filter((image) => image.type === "logos").map((image) => {
      return {
        aspect_ratio: image.aspect_ratio,
        height: image.height,
        file_path: image.file_path,
        vote_average: image.vote_average,
        vote_count: image.vote_count,
        width: image.width
      };
    });

    return {
      id: episode.id,
      backdrops,
      logos,
      posters
    };

  } catch (error) {
    throw error;
  }
}