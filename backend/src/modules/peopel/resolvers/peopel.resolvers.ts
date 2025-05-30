import { personCredits } from "./queries/peopel-credits";
import { personDetails } from "./queries/peopel-details";
import { personExternalIds } from "./queries/person-externalIds";

const resolvers = {
  Query: {
    personDetails,
    personCredits,
    personExternalIds
  },
};

export default resolvers;
