import _ from "lodash";
import { RegisterInput, Response } from "../../../../utils/types";
import { registerService } from "../../services";

import CustomGraphqlError from "../../../../shared-lib/errors";
import { getMessage } from "../../../../utils/message";

export const register = async (
  _: any,
  { input }: { input: RegisterInput }
): Promise<Response> => {
  if (!input) {
    throw new CustomGraphqlError(getMessage("INVALID_INPUT"), "INVALID_INPUT");
  }

  try {
    return await registerService(_, { input });
  } catch (error) {
   throw error;
  }
};
