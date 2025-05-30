import { CronJob } from "cron";
import movie from "../modules/movie";
import configuration from "../modules/configuration";
import tv from "../modules/tv";
import { Config } from "../config/config";
if (!Config.CRON_SCHEDULE) {
  throw new Error("Cron schedule not found");
}
const fetchData = new CronJob(Config.CRON_SCHEDULE, async () => {
  try {
    await firstTimeFetch();
  } catch (error) {}
});

export const firstTimeFetch = async () => {
  try {
    console.log("Fetching data for the first time");
    await Promise.allSettled([tv()]);
  } catch (error) {}
};
fetchData.start();

firstTimeFetch();
