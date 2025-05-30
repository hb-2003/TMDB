import Video from "../../schema/models/video";
import { IVideos, VideoDetailTV } from "../../utils/types";
import { handleError } from "../../utils/error";
export const storeVideo = async (
  id: number,
  videos: VideoDetailTV[]
): Promise<void> => {
  try {
    if (!videos) return;
    if (videos && Array.isArray(videos)) {
      const newVideos: IVideos[] = (
        await Promise.all(
          videos.map(async (vid) => {
            const existingVideo: Video | null = await Video.findOne({
              where: { id: vid.id },
            });
            return existingVideo
              ? undefined
              : {
                  id: vid.id,
                  iso_639_1: vid.iso_639_1,
                  iso_3166_1: vid.iso_3166_1,
                  key: vid.key,
                  name: vid.name,
                  site: vid.site,
                  size: vid.size,
                  type: vid.type,
                  movie_tv_id: id,
                };
          })
        )
      ).filter((video): video is IVideos => video !== undefined);

      await Video.bulkCreate(newVideos);
    }
  } catch (error) {
    await handleError(error, () =>  storeVideo(id, videos));
  }
}
