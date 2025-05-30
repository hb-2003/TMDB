import { SeriesAccountStates } from "./queries/SeriesAccountStates";
import { SeriesCredits } from "./queries/SeriesCredits";
import { SeriesDetail } from "./queries/SeriesDetails";
import { SeriesDetailsOptions } from "./queries/SeriesDetailsOptions";
import { SeriesExternalIds } from "./queries/SeriesExternalIds";
import { SeriesImages } from "./queries/SeriesImages";
import { SeriesList } from "./queries/SeriesList";
import { SeriesRecommendations } from "./queries/SeriesRecommendations";
import { SeriesTranslations } from "./queries/SeriesTranslations";
import { SeriesVideos } from "./queries/SeriesVideos";
const resolvers = {
  Query: {
    SeriesDetail,
    SeriesAccountStates,
    SeriesCredits,
    SeriesExternalIds,
    SeriesImages,
    SeriesList,
    SeriesRecommendations,
    SeriesTranslations,
    SeriesVideos,
    SeriesDetailsOptions,

  },
  Mutation: {

  },
};

export default resolvers;
