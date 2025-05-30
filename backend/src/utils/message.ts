import messages from "../config/messages.json";

import { MessageType } from "./types";
export const getMessage = (type: MessageType): string => {
  return messages[type];
};
