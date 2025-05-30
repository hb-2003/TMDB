import { peopleCreditsService } from "../../services";
import { PersonCredits } from "../../services/type";



export const personCredits = async (
  _: any,
  { id }: { id: string }
): Promise<PersonCredits> => {
  try {

    return await peopleCreditsService(Number(id));
  } catch (err) {
    throw err;
  }
} 