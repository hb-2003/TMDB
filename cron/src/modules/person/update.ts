import People from "../../schema/models/people";
import { endpoints } from "../../config/endpoints";
import { IPeople } from "../../utils/types";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { personService } from "./person";

export interface PeopleResponse {
  page: number;
  total_pages: number;
  results: Array<{
    id: number;
    adult: boolean;
  }>;
}

export const updatePeople = async (people_id: number): Promise<void> => {
  let page: number = 1;
  let total_pages: number = 1;

  while (page <= total_pages) {
    try {
      const { data }: { data: PeopleResponse } = await axios.get(
        endpoints.changes.people(page)
      );
      const newPeople: number[] = [];
      total_pages = data.total_pages;
      const people = data.results;
      for (const person of people) {
        const existingPerson = await People.findOne({
          where: { id: person.id },
        });
        if (existingPerson) {
          const { data }: { data: IPeople } = await axios.get(
            endpoints.people.details(person.id)
          );
          await existingPerson.update(data);
        } else {
          newPeople.push(person.id);
        }
      }
      await personService(newPeople);
    } catch (error) {
      await handleError(error, () => updatePeople(people_id));
    }
    page++;
  }
};
