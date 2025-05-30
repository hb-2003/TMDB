import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { endpoints } from "../../config/endpoints";

import Country from "../../schema/models/country";
import Certification, {
  CertificationAttributes,
} from "../../schema/models/certification";
import { CertificationResponse } from "../../utils/types";

export const certificationService = async (): Promise<void> => {
  try {
    const [movieCertification, tvCertification]: [
      CertificationResponse,
      CertificationResponse
    ] = await Promise.all([
      getCertification(endpoints.certification.movie),
      getCertification(endpoints.certification.tv),
    ]);

    await Promise.all([
      storeCertification(movieCertification),
      storeCertification(tvCertification),
    ]);
  } catch (error) {}
};

const getCertification = async (
  url: string
): Promise<CertificationResponse> => {
  try {
    const { data }: { data: CertificationResponse } =
      await axios.get<CertificationResponse>(url);
    return data;
  } catch (error) {
    throw error;
  }
};

const storeCertification = async (
  certifications: CertificationResponse
): Promise<void> => {
  try {
    const certificationData: CertificationAttributes[] = [];

    for (const [country, certs] of Object.entries(
      certifications.certifications
    )) {
      const countryRecord: Country | null = await Country.findOne({
        where: { iso_3166_1: country },
        attributes: ["id"],
      });
      if (countryRecord) {
        certs.forEach(
          (cert: { certification: string; meaning: string; order: number }) => {
            certificationData.push({
              country_id: countryRecord.id!,
              certification: cert.certification.substring(0, 255),
              meaning: cert.meaning.substring(0, 255),
              order: cert.order,
            });
          }
        );
      }
    }

    if (certificationData.length) {
      await Certification.bulkCreate(certificationData);
    }
  } catch (error) {
    await handleError(error, () => storeCertification(certifications));
  }
};
