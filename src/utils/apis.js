import { apiUrl } from "./config";
export const apis = {
  getCountries: "https://api.countrystatecity.in/v1/countries",
  // authentication
  signup: apiUrl + '/user/signup',
  signin: apiUrl + '/user/signin',
  verifyEmail: apiUrl + '/user/verifyEmail',
  getUserInfo: (id) => {
    return `${apiUrl}/user/info/${id}`
  },
  userAvatarURL: (id)=> {
    return `${apiUrl}/user/avatar/${id}`
  }, 
  // leagues
  getLeagues: apiUrl + '/league/all',
  createLeague: apiUrl + "/league/create",
  updateLeague: apiUrl + '/league/update',
  deleteLeague: (id) => {
    return `${apiUrl}/league/remove/${id}`
  },
  leagueLogoURL: (userId, id) => `${apiUrl}/league/${userId}/logo/${id}`,
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
