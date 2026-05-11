import evergreenHeightsClient from "./clients/evergreenHeightsClient";

export const clients = {
  "evergreen-heights": evergreenHeightsClient,
};

export function getSurveyClient(clientKey) {
  return clients[clientKey];
}