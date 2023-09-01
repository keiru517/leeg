import { apiUrl } from "./config";
export const apis = {
  // leagues
  getLeagues: apiUrl + '/league/all',
  createLeague: apiUrl + "/league/create",
  updateLeague: apiUrl + '/league/update',
  deleteLeague: (id) => {
    return `${apiUrl}/league/remove/${id}`
  },
  leagueLogoURL: (id) => `${apiUrl}/league/logo/${id}`,
  // teams
  getTeams: apiUrl + '/team/all',
  createTeam: apiUrl + '/team/create',
  updateTeam: apiUrl + '/team/update',
  deleteTeam: (id) => {
    return `${apiUrl}/team/remove/${id}`
  },
  teamLogoURL: (id) => `${apiUrl}/team/logo/${id}`,
  // matches
  getMatchtes: apiUrl + '/match/all',
  createMatch: apiUrl + '/match/create',
  updateMatch: apiUrl + '/match/update',
  updateMatchResult: apiUrl + '/match/updateResult',
  deleteMatch: (id) => {
    return `${apiUrl}/match/remove/${id}`
  },
  // matchup
  getMatchups: apiUrl + '/matchup/all',
  createMatchup: apiUrl + '/matchup/create',
  getPlayers: apiUrl + '/player/all',
  createPlayer: apiUrl + '/player/create',
  acceptPlayer: apiUrl + '/player/accept',
  unacceptPlayer: apiUrl + '/player/unaccept',
  addPlayer: apiUrl + '/player/add',
};

export default apis;
