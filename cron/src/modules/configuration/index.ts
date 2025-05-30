import { countriesService } from "./countries";
import { genreService } from "./genres";
import { languagesService } from "./languages";
import { jobService } from "./job";
import { certificationService } from "./certification";

const configuration = async () => {
  try {
    await countriesService();
    await genreService();
    await languagesService();
    await jobService();
    await certificationService();
  } catch (error) {
    
  }
};

export default configuration;
