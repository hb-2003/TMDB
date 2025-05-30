import { episodeDetails } from "./queries/episode-details";
import { episodeExternalIds } from "./queries/episode-externalIds";
import { episodeImages } from "./queries/episode-images";
import { episodeTranslations } from "./queries/episode-translations";
import { episodeVideos } from "./queries/episode-videos";
import { episodeCredits } from "./queries/episodeCredits";

const resolvers = {
  Query: {
    episodeDetails,
    episodeCredits,
    episodeExternalIds,
    episodeImages,
    episodeVideos,
    episodeTranslations
  },
  Mutation: {

  },
};

export default resolvers;
