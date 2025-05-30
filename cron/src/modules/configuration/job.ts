import { endpoints } from "../../config/endpoints";
import Job, { jobAttributes } from "../../schema/models/job";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";



interface JobData {
  department: string;
  jobs: string[];
}

export const jobService = async (): Promise<void> => {
  try {

        const { data } = await axios.get<JobData[]>(endpoints.configuration.jobs);
    const jobPromises: jobAttributes[] = data.flatMap(({ department, jobs }) =>
      jobs.map((jobTitle) => ({
        department,
        job_title: jobTitle,
      }))
    );
    await Job.bulkCreate(jobPromises, { ignoreDuplicates: true });
  } catch (error) {
    await handleError(error, () => jobService());
  }
};
