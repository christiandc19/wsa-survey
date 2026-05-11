import evergreenHeightsClient from "./clients/evergreenHeightsClient";
import asburyHeightsClient from "./clients/asburyHeightsClient";

export const clients = {
  "evergreen-heights": evergreenHeightsClient,
  "asbury-heights": asburyHeightsClient,
};

export function getSurveyClient(clientKey) {
  return clients[clientKey];
}