import { apiUrl } from "./config";
export const apis = {
  // leagues
  create_league: apiUrl + "/league/create",
  update_league: (id) => {
    return `${apiUrl}/league/update/${id}`;
  },
  delete_league: (id) => {
    return `${apiUrl}/league/delete/${id}`;
  },
  leagueLogoURL: (id) => `${apiUrl}/league/logo/${id}`,
  teamLogoURL: (id) => `${apiUrl}/team/logo/${id}`,
};

export default apis;
