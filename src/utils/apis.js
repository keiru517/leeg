import { apiUrl } from "./config";
export const apis = {
  getCountries: "https://api.countrystatecity.in/v1/countries",
  // authentication
  signup: apiUrl + "/user/signup",
  signin: apiUrl + "/user/signin",
  verifyEmail: apiUrl + "/user/verifyEmail",
  getUsers: apiUrl + '/user/all',
  getUserInfo: (id) => {
    return `${apiUrl}/user/info/${id}`;
  },
  userAvatarURL: (id) => {
    return `${apiUrl}/user/avatar/${id}`;
  },
  forgotPassword: apiUrl + "user/forgotPassword",
  // leagues
  getLeagues: apiUrl + "/league/all",
  createLeague: apiUrl + "/league/create",
  updateLeague: apiUrl + "/league/update",
  deleteLeague: (id) => {
    return `${apiUrl}/league/remove/${id}`;
  },
  leagueLogoURL: (userId, id) => `${apiUrl}/league/${userId}/logo/${id}`,
  applyLeague: apiUrl + "/league/apply",
  allowFan: apiUrl + "/league/allowFan",
  toggleLeagueId: apiUrl + '/league/toggleLeagueId',
  togglePosition: apiUrl + '/league/togglePosition',
  togglePassword: apiUrl + '/league/togglePassword',
  // teams
  getTeams: apiUrl + "/team/all",
  createTeam: apiUrl + "/team/create",
  updateTeam: apiUrl + "/team/update",
  deleteTeam: (id) => {
    return `${apiUrl}/team/remove/${id}`;
  },
  teamLogoURL: (userId, id) => `${apiUrl}/team/logo/${userId}/${id}`,
  // matches
  getMatchtes: apiUrl + "/match/all",
  createMatch: apiUrl + "/match/create",
  updateMatch: apiUrl + "/match/update",
  updateMatchResult: apiUrl + "/match/updateResult",
  deleteMatch: (id) => {
    return `${apiUrl}/match/remove/${id}`;
  },
  // matchup
  getMatchups: apiUrl + "/matchup/all",
  createMatchup: apiUrl + "/matchup/create",
  // player
  getPlayers: apiUrl + "/player/all",
  createPlayer: apiUrl + "/player/create",
  updatePlayer: apiUrl + "/player/update",
  removePlayer: apiUrl + "/player/remove",
  acceptPlayer: apiUrl + "/player/accept",
  unacceptPlayer: apiUrl + "/player/unaccept",
  addPlayer: apiUrl + "/player/add",
  // admin
  getAdmins: apiUrl + '/admin/all',
  inviteAdmin: apiUrl + '/admin/invite',
  removeAdmin: apiUrl + '/admin/remove',
  // settings
};

export default apis;
