import axios from "axios";
// league
export const GET_LEAGUES = "GET_LEAGUES";
export const OPEN_CREATE_LEAGUE_DIALOG = "OPEN_CREATE_LEAGUE_DIALOG";
export const CLOSE_LEAGUE_DIALOG = "CLOSE_LEAGUE_DIALOG";
export const OPEN_EDIT_LEAGUE_DIALOG = "OPEN_EDIT_LEAGUE_DIALOG";
export const OPEN_DELETE_LEAGUE_DIALOG = "OPEN_DELETE_LEAGUE_DIALOG";
export const SET_SELECTED_LEAGUE = "SET_SELECTED_LEAGUE";
// Teams
export const GET_TEAMS = "GET_TEAMS";
export const OPEN_CREATE_TEAM_DIALOG = "OPEN_CREATE_TEAM_DIALOG";
export const OPEN_EDIT_TEAM_DIALOG = "OPEN_EDIT_TEAM_DIALOG";
export const OPEN_DELETE_TEAM_DIALOG = "OPEN_DELETE_TEAM_DIALOG";
export const CLOSE_TEAM_DIALOG = "CLOSE_TEAM_DIALOG";
export const OPEN_ADD_PLAYER_DIALOG = "OPEN_ADD_PLAYER_DIALOG";

// Matches
export const GET_MATCHES = "GET_MATCHES";
export const OPEN_CREATE_MATCH_DIALOG = "OPEN_CREATE_MATCH_DIALOG";
export const CLOSE_MATCH_DIALOG = "CLOSE_MATCH_DIALOG";
// player
export const GET_PLAYERS = "GET_PLAYERS";
export const OPEN_INVITE_PLAYER_DIALOG = "OPEN_INVITE_PLAYER_DIALOG";
export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";

export const OPEN_ADD_SUBSTITUTE_DIALOG = "OPEN_ADD_SUBSTITUTE_DIALOG";
export const CLOSE_ADD_SUBSTITUTE_DIALOG = "CLOSE_ADD_SUBSTITUTE_DIALOG";

// Admin
export const GET_ADMINS = "GET_ADMINS";
// league actions----------------------------------


// Get leagues from the server
export const getLeagues = async (dispatch) => {
  try {
    const response = await axios.get(`/league/all`);
    const leagues = response.data.leagues;
    dispatch({
      type: GET_LEAGUES,
      payload: leagues,
    });
  } catch (error) {
    dispatch({
      type: GET_LEAGUES,
      payload: [],
    });
  }
};

// create
export const openCreateLeagueDialog = (payload) => ({
  type: OPEN_CREATE_LEAGUE_DIALOG,
  payload: payload,
});

export const closeLeagueDialog = () => ({
  type: CLOSE_LEAGUE_DIALOG,
});

export const openEditLeagueDialog = (payload) => ({
  type: OPEN_EDIT_LEAGUE_DIALOG,
  payload: payload,
});

export const openDeleteLeagueDialog = (payload) => ({
  type: OPEN_DELETE_LEAGUE_DIALOG,
  payload: payload,
});

export const setSelectedLeague = (payload) => ({
  type: SET_SELECTED_LEAGUE,
  payload: payload,
});

// Players
export const openInvitePlayerDialog = (payload) => ({
  type: OPEN_INVITE_PLAYER_DIALOG,
  payload: payload,
});

// Team actions -----------------------------------
export const getTeams = (payload) => ({
  type: GET_TEAMS,
  payload: payload,
});

export const openCreateTeamDialog = (payload) => ({
  type: OPEN_CREATE_TEAM_DIALOG,
  payload: payload,
});

export const closeTeamDialog = () => ({
  type: CLOSE_TEAM_DIALOG,
});

export const openEditTeamDialog = (payload) => ({
  type: OPEN_EDIT_TEAM_DIALOG,
  payload: payload,
});

export const openDeleteTeamDialog = (payload) => ({
  type: OPEN_DELETE_TEAM_DIALOG,
  payload: payload,
});

export const openAddPlayerDialgo = (payload) => ({
  type: OPEN_ADD_PLAYER_DIALOG,
  payload: payload,
});

// Matches Action
export const getMatches = (payload) => ({
  type: GET_MATCHES,
  payload: payload,
});

export const closeMatchDialog = () => ({
  type: CLOSE_MATCH_DIALOG,
});

// player action
export const getPlayers = (payload) => ({
  type: GET_PLAYERS,
  payload: payload,
});
export const AddPlayer = (payload) => ({
  type: ADD_PLAYER,
  payload: payload,
});

export const RemovePlayer = (payload) => ({
  type: REMOVE_PLAYER,
  payload: payload,
});

export const openAddSubstitueDialog = () => ({
  type: OPEN_ADD_SUBSTITUTE_DIALOG,
});

export const closeAddSubstitueDialog = () => ({
  type: CLOSE_ADD_SUBSTITUTE_DIALOG,
});

// Admin
export const getAdmins = (payload) => ({
  type: GET_ADMINS,
  payload: payload,
});

export const getUserInfo = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
