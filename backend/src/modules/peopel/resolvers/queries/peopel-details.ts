

import { peopleDetailsService } from "../../services";
import { PersonDetails } from "../../services/type";

export const personDetails = async (
  _: any,
  { id }: { id: number }
): Promise<PersonDetails> => {
  try {
    return await peopleDetailsService(id);
  }
  catch (error) {
    throw error;
  }
};
