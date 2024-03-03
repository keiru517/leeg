import { apiUrl } from "./config";
export const apis = {
  getCountries: "https://api.countrystatecity.in/v1/countries",
  // authentication
  signup: apiUrl + "/user/signup",
  signin: apiUrl + "/user/signin",
  verifyEmail: apiUrl + "/user/verifyEmail",
  getUsers: apiUrl + "/user/all",
  getUserInfo: (id) => {
    return `${apiUrl}/user/info/${id}`;
  },
  userAvatarURL: (id) => {
    return `${apiUrl}/user/avatar/${id}`;
  },
  playerAvatarURL: (id) => {
    return `${apiUrl}/player/avatar/${id}`;
  },
  forgotPassword: apiUrl + "/user/forgotPassword",
  resetPassword: apiUrl + "/user/resetPassword",
  updateInfo: apiUrl + "/user/updateInfo",
  updatePassword: apiUrl + "/user/updatePassword",
  // leagues
  getLeagues: apiUrl + "/league/all",
  createLeague: apiUrl + "/league/create",
  updateLeague: apiUrl + "/league/update",
  updateTimer: apiUrl + "/league/updateTimer",
  deleteLeague: (id) => {
    return `${apiUrl}/league/remove/${id}`;
  },
  leagueLogoURL: (userId, id) => `${apiUrl}/league/${userId}/logo/${id}`,
  applyLeague: apiUrl + "/league/apply",
  addPassword: apiUrl + "/league/addPassword",
  removePassword: apiUrl + "/league/removePassword",
  allowFan: apiUrl + "/league/allowFan",
  toggleSubstitutes: apiUrl + "/league/toggleSubstitutes",
  togglePosition: apiUrl + "/league/togglePosition",
  toggleJerseyNumber: apiUrl + "/league/toggleJerseyNumber",
  toggleAttempts3: apiUrl + "/league/toggleAttempts3",
  toggleAttempts2: apiUrl + "/league/toggleAttempts2",
  toggleAttempts1: apiUrl + "/league/toggleAttempts1",
  toggleBlocks: apiUrl + "/league/toggleBlocks",
  toggleRebounds: apiUrl + "/league/toggleRebounds",
  toggleAssists: apiUrl + "/league/toggleAssists",
  toggleFouls: apiUrl + "/league/toggleFouls",
  toggleSteals: apiUrl + "/league/toggleSteals",
  toggleTurnovers: apiUrl + "/league/toggleTurnovers",
  togglePassword: apiUrl + "/league/togglePassword",
  // blogs
  getBlogs: apiUrl + "/blog/all",
  createBlog: apiUrl + "/blog/create",
  updateBlog: apiUrl + "/blog/update",
  deleteBlog: apiUrl + "/blog/remove",
  // comments
  createComment: apiUrl + "/comment/create",
  updateComment: apiUrl + "/comment/update",
  deleteComment: apiUrl + "/comment/remove",
  // replies
  createReply: apiUrl + "/reply/create",
  updateReply: apiUrl + "/reply/update",
  deleteReply: (id) => {
    return `${apiUrl}/reply/remove/${id}`;
  },
  // teams
  getTeams: apiUrl + "/team/all",
  createTeam: apiUrl + "/team/create",
  updateTeam: apiUrl + "/team/update",
  deleteTeam: (id) => {
    return `${apiUrl}/team/remove/${id}`;
  },
  teamLogoURL: (userId, id) => `${apiUrl}/team/logo/${userId}/${id}`,
  // matches
  getMatch: (id) => {
    return `${apiUrl}/match/get/${id}`;
  },
  getMatches: apiUrl + "/match/all",
  createMatch: apiUrl + "/match/create",
  updateMatch: apiUrl + "/match/update",
  updateMatchResult: apiUrl + "/match/updateResult",
  updateMatchSettings: apiUrl + "/match/updateSettings",
  deleteMatch: (id) => {
    return `${apiUrl}/match/remove/${id}`;
  },
  // matchup
  getMatchups: apiUrl + "/matchup/all",
  createMatchup: apiUrl + "/matchup/create",
  createOneMatchup: apiUrl + "/matchup/createOne",
  updateMatchup: apiUrl + "/matchup/update",
  completeMatchup: apiUrl + "/matchup/complete",
  incompleteMatchup: apiUrl + "/matchup/incomplete",
  getLogs: apiUrl + "/log/all",
  createOneLog: apiUrl + "/log/createOne",
  updateOneLog: apiUrl + "/log/updateOne",
  removeLog: apiUrl + "/log/remove",
  minusLog: apiUrl + "/log/minus",
  createLogs: apiUrl + "/log/create",
  editLineups: apiUrl + "/matchup/editLineups",
  // player
  getPlayers: apiUrl + "/player/all",
  invitePlayer: apiUrl + "/player/invite",
  createPlayer: apiUrl + "/player/create",
  updatePlayer: apiUrl + "/player/update",
  uploadPlayerAvatar: apiUrl + "/player/uploadPlayerAvatar",
  removePlayerFromTeam: apiUrl + "/player/removeFromTeam",
  // substitute
  getSubstitutes: apiUrl + "/substitutes/all",
  createSubstitute: apiUrl + "/substitutes/create",
  removeSubstitute: apiUrl + "/substitutes/remove",
  removeFromLeague: apiUrl + "/player/removeFromLeague",
  acceptPlayer: apiUrl + "/player/accept",
  unacceptPlayer: apiUrl + "/player/unaccept",
  addPlayer: apiUrl + "/player/add",
  updatePoints: apiUrl + "/player/updatePoints",
  // admin
  getAdmins: apiUrl + "/admin/all",
  inviteAdmin: apiUrl + "/admin/invite",
  removeAdmin: apiUrl + "/admin/remove",
  // settings
};

export default apis;
