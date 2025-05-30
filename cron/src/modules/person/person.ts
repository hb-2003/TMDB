import People from "../../schema/models/people";
import { endpoints } from "../../config/endpoints";
import { IPeople } from "../../utils/types";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { externalIdsService } from "./external_ids";

export const personService = async (personIds: number[]): Promise<void> => {
  try {
    const fetchPerson = async (id: number) => {
      if (await People.findOne({ where: { id } })) return null;

      const { data }: { data: IPeople } = await axios.get(
        endpoints.people.details(id)
      );
      return {
        ...data,
        birthday: data.birthday ? new Date(data.birthday) : null,
        deathday: data.deathday ? new Date(data.deathday) : null,
      };
    };

    const newPeoples = (await Promise.all(personIds.map(fetchPerson))).filter(
      Boolean
    ) as IPeople[];
    const uniquePeoples = newPeoples.filter(
      (person, index, self) =>
        index === self.findIndex((p) => p.id === person.id)
    );

    if (uniquePeoples.length > 0) {
      await People.bulkCreate(uniquePeoples, { ignoreDuplicates: true });
    }
    await Promise.all(
      uniquePeoples.map((person) => externalIdsService(person.id, "person"))
    );
  } catch (error) {
    await handleError(error, () => personService(personIds));
  }
};
