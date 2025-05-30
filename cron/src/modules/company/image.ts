import CompanyImage, {
  CompanyImageAttributes,
} from "../../schema/models/companyImage";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { endpoints } from "../../config/endpoints";

import { CompanyImageResponse } from "../../utils/types";

export const companyImageServices = async (
  company_ids: number[]
): Promise<void> => {
  try {
    const newCompanyImages_data: CompanyImageAttributes[] = (
      await Promise.all(
        company_ids.map(async (id) => {
          const exitCompanyImage: CompanyImageAttributes | null =
            await CompanyImage.findOne({
              where: { company_id: id },
            });
          if (!exitCompanyImage) {
            const { data }: { data: CompanyImageResponse } = await axios.get(
              endpoints.company.images(id)
            );

            return data.logos.map((logo) => ({
              company_id: id,
              aspect_ratio: logo.aspect_ratio,
              file_path: logo.file_path,
              height: logo.height,
              image_id: logo.id,
              file_type: logo.file_type,
              vote_average: logo.vote_average,
              vote_count: logo.vote_count,
              width: logo.width,
            }));
          }
          return [];
        })
      )
    ).flat();

    const newCompanyImages: CompanyImageAttributes[] =
      newCompanyImages_data.filter(Boolean) as CompanyImageAttributes[];
    if (newCompanyImages.length) {
      await CompanyImage.bulkCreate(newCompanyImages, {
        ignoreDuplicates: true,
      });
    }
  } catch (error) {
    // await handleError(error, () => companyImageServices(company_ids));
    throw error;
  }
};
