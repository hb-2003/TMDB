import Company, { CompanyAttributes } from "../../schema/models/company";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { endpoints } from "../../config/endpoints";
import { companyImageServices } from "./image";

import { CompanyResponse } from "../../utils/types";

export const companyServices = async (company_ids: number[]): Promise<void> => {
  try {
    const newCompanies_data: (CompanyAttributes | undefined)[] =
      await Promise.all(
        company_ids.map(async (id) => {
          const exitCompany: CompanyAttributes | null = await Company.findByPk(
            id
          );
          if (!exitCompany) {
            const { data }: { data: CompanyResponse } = await axios.get(
              endpoints.company.details(id)
            );
            return {
              id: data.id,
              name: data.name,
              description: data.description,
              headquarters: data.headquarters,
              homepage: data.homepage,
              logo_path: data.logo_path || "",
              origin_country: data.origin_country,
              parent_company: data.parent_company,
            };
          }
          return undefined;
        })
      );

    const newCompanies: CompanyAttributes[] = newCompanies_data.filter(
      (company): company is CompanyAttributes => company !== undefined
    );
    const newCompany_ids: number[] = newCompanies.map((company) => company.id);
    await Company.bulkCreate(newCompanies, { ignoreDuplicates: true });
    await companyImageServices(newCompany_ids);
  } catch (error) {
    await handleError(error, () => companyServices(company_ids));
  }
};
