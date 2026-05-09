import evergreenHeights from "./clients/evergreenHeightsClient";

export const clients = {
  "evergreen-heights": evergreenHeights,
};

export function getSurveyClient(clientKey) {
  return clients[clientKey] || clients["evergreen-heights"];
}