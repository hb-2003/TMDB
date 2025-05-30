import Network from "../../schema/models/network";
import { endpoints } from "../../config/endpoints";
import axios from "../../config/axiosConfig";
import { handleError } from "../../utils/error";
import { INetwork, NetworkResponse } from "../../utils/types";

export const networkService = async (ids: number[]): Promise<void> => {
  try {
    const networkIds = ids.filter((id) => id !== 0);
    if (!networkIds.length) return;

    const networks = await Promise.all(
      networkIds.map(async (id) => {
        try {
          const { data }: { data: INetwork } = await axios.get(
            endpoints.network.details(id)
          );
          return data;
        } catch (error) {
          await handleError(error, () => networkService([id]));
        }
      })
    );

    const newNetworksData: INetwork[] = networks
      .filter((network): network is INetwork => network !== undefined)
      .map((network) => ({
        id: network.id,
        name: network.name,
        logo_path: network.logo_path || "",
        origin_country: network.origin_country,
        homepage: network.homepage,
        headquarters: network.headquarters,
      }));

    if (newNetworksData.length) {
      await Network.bulkCreate(newNetworksData, {
        ignoreDuplicates: true,
      });
    }
  } catch (error) {
    await handleError(error, () => networkService(ids));
  }
};
