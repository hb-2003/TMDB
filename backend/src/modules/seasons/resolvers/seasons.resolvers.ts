import { SeasonCredits } from "./queries/SeasonCredits";
import { AggregateCredits } from "./queries/AggregateCredits";
import { SeasonAccountStates } from "./queries/SeasonAccountStates";
import { SeasonDetails } from "./queries/SeasonDetails";
import { SeasonExternalIds } from "./queries/SeasonExternalIds";
import { SeasonImages } from "./queries/SeasonImages";
import { SeasonTranslations } from "./queries/SeasonTranslations";
import { SeasonVideos } from "./queries/SeasonVideos";

const resolvers = {
  Query: {
    SeasonDetails,
    SeasonAccountStates,
    AggregateCredits,
    SeasonCredits,
    SeasonExternalIds,
    SeasonImages,
    SeasonVideos,
    SeasonTranslations,

  },
  Mutation: {

  },
};

export default resolvers;
