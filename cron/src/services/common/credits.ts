import Cast, { ICast } from "../../schema/models/cast";
import Job, { jobAttributes } from "../../schema/models/job";
import Crew, { CrewAttributes } from "../../schema/models/crew";
import { handleError } from "../../utils/error";
import { personService } from "../../modules/person/person";
import { TVCredits } from "../../utils/types";

export const storeCredits = async (data: TVCredits, type: string) => {
  try {

    const newCastData: ICast[] = data.cast
      .map((m) => ({
        movie_tv_id: data.id,
        type,
        name: m.name,
        character: m.character,
        person_id: m.id,
        credit_id: m.credit_id,
        adult: m.adult,
        order: m.order,
      }));
    const jobs: Job[] = await Job.findAll();
    const newCrewData: CrewAttributes[] = data.crew
      .map((m) => ({
        movie_tv_id: data.id,
        type,
        name: m.name,
        job_id: jobs.find((j) => j.job_title === m.job)?.id?.toString() || "",
        person_id: m.id,
        credit_id: m.credit_id,
        adult: m.adult,
      }));

    const people: number[] = [...newCastData, ...newCrewData].map(
      (m) => m.person_id
    );

    await personService(people);

    if (newCastData.length > 0) {
      await Cast.bulkCreate(newCastData, { ignoreDuplicates: true });
    }
    if (newCrewData.length > 0) {
      await Crew.bulkCreate(newCrewData, { ignoreDuplicates: true });
    }
  } catch (error) {
    await handleError(error, () => storeCredits(data, type));
  }
};
