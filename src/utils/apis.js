import { apiUrl } from "./config";
export const apis = {
  // leagues
  create_league: apiUrl + "/league/create",
  get_leagues: apiUrl + "/league/get",
  update_league: (id) => {
    return `${apiUrl}/league/update/${id}`;
  },
  delete_league: (id) => {
    return `${apiUrl}/league/delete/${id}`;
  },
  apiURL(url) {
    return `${apiUrl}/${url}`;
  },
  leagueLogoURL: (id) => `${apiUrl}/league/logo/${id}`,
};

export default apis;
