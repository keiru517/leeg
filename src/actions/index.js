import axios from "axios";
import apis from "../utils/apis";
import { useNavigate } from "react-router-dom";
// setting
export const SET_DARK_MODE = "SET_DARK_MODE";
// user
export const GET_USER = "GET_USER";
export const GET_USERS = "GET_USERS";
// country
export const GET_COUNTRIES = "GET_COUNTRIES";
// league
export const GET_LEAGUES = "GET_LEAGUES";
export const OPEN_CREATE_LEAGUE_DIALOG = "OPEN_CREATE_LEAGUE_DIALOG";
export const CLOSE_LEAGUE_DIALOG = "CLOSE_LEAGUE_DIALOG";
export const OPEN_EDIT_LEAGUE_DIALOG = "OPEN_EDIT_LEAGUE_DIALOG";
export const OPEN_DELETE_LEAGUE_DIALOG = "OPEN_DELETE_LEAGUE_DIALOG";
export const OPEN_SET_LEAGUE_PASSWORD_DIALOG =
  "OPEN_SET_LEAGUE_PASSWORD_DIALOG";
export const OPEN_REMOVE_LEAGUE_PASSWORD_DIALOG =
  "OPEN_REMOVE_LEAGUE_PASSWORD_DIALOG";
export const OPEN_APPLY_LEAGUE_PASSWORD_DIALOG =
  "OPEN_APPLY_LEAGUE_PASSWORD_DIALOG";
export const CLOSE_LEAGUE_PASSWORD_DIALOG = "CLOSE_LEAGUE_PASSWORD_DIALOG";
export const SET_SELECTED_LEAGUE = "SET_SELECTED_LEAGUE";
// export const SET_LEAGUE_LOGO_URL = "SET_LOGO_URL";
// Teams
export const GET_TEAMS = "GET_TEAMS";
export const OPEN_CREATE_TEAM_DIALOG = "OPEN_CREATE_TEAM_DIALOG";
export const OPEN_EDIT_TEAM_DIALOG = "OPEN_EDIT_TEAM_DIALOG";
export const OPEN_DELETE_TEAM_DIALOG = "OPEN_DELETE_TEAM_DIALOG";
export const CLOSE_TEAM_DIALOG = "CLOSE_TEAM_DIALOG";
export const SET_TEAM_LOGO_URL = "SET_TEAM_LOGO_URL";

// Matches
export const GET_MATCHES = "GET_MATCHES";
export const OPEN_CREATE_MATCH_DIALOG = "OPEN_CREATE_MATCH_DIALOG";
export const OPEN_EDIT_MATCH_DIALOG = "OPEN_EDIT_MATCH_DIALOG";
export const CLOSE_MATCH_DIALOG = "CLOSE_MATCH_DIALOG";
// Matchups
export const GET_MATCHUPS = "GET_MATCHUPS";
export const GET_LOGS = "GET_LOGS";
export const OPEN_MATCHUP_SETTING_DIALOG = "OPEN_MATCHUP_SETTING_DIALOG";
export const OPEN_EDIT_EVENT_DIALOG = "OPEN_EDIT_EVENT_DIALOG";
export const OPEN_ADD_EVENT_DIALOG = "OPEN_ADD_EVENT_DIALOG";
export const CLOSE_EDIT_EVENT_DIALOG = "CLOSE_EDIT_EVENT_DIALOG";
export const OPEN_PLAYER_STATS_DIALOG = "OPEN_PLAYER_STATS_DIALOG";
export const CLOSE_PLAYER_STATS_DIALOG = "CLOSE_PLAYER_STATS_DIALOG";
// player
export const GET_PLAYERS = "GET_PLAYERS";
export const OPEN_INVITE_PLAYER_DIALOG = "OPEN_INVITE_PLAYER_DIALOG";
export const OPEN_SELECT_PLAYER_DIALOG = "OPEN_SELECT_PLAYER_DIALOG";
export const CLOSE_SELECT_PLAYER_DIALOG = "CLOSE_SELECT_PLAYER_DIALOG";
export const OPEN_ADD_PLAYER_DIALOG = "OPEN_ADD_PLAYER_DIALOG";
export const ACCEPT_PLAYER = "ACCEPT_PLAYER";
export const UNACCEPT_PLAYER = "UNACCEPT_PLAYER";
export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const CLOSE_JERSEY_NUMBER_MODAL = "CLOSE_JERSEY_NUMBER_MODAL";

export const OPEN_ADD_SUBSTITUTE_DIALOG = "OPEN_ADD_SUBSTITUTE_DIALOG";
export const CLOSE_ADD_SUBSTITUTE_DIALOG = "CLOSE_ADD_SUBSTITUTE_DIALOG";

export const OPEN_LINEUP_DIALOG = "OPEN_LINEUP_DIALOG";
export const CLOSE_LINEUP_DIALOG = "CLOSE_LINEUP_DIALOG";

// Admin
export const GET_ADMINS = "GET_ADMINS";
export const OPEN_ADMIN_DIALOG = "OPEN_ADMIN_DIALOG";

// league actions----------------------------------

// Get leagues from the server
export const getLeagues = async (dispatch) => {
  try {
    const response = await axios.get(apis.getLeagues);
    const leagues = response.data.leagues;

    // set logo image to all leagues
    leagues.map((league) => {
      const logoUrl = apis.leagueLogoURL(league.userId, league.id);
      league.logo = logoUrl;
    });
    dispatch({
      type: GET_LEAGUES,
      payload: leagues,
    });
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status == 401) {
      console.log("hi");
    }
    dispatch({
      type: GET_LEAGUES,
      payload: [],
    });
  }
};

export const applyLeague = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.applyLeague, data);
    const leagues = response.data.leagues;
    // set logo image to all leagues
    leagues.map((league) => {
      const logoUrl = apis.leagueLogoURL(league.userId, league.id);
      league.logo = logoUrl;
    });
    dispatch({
      type: GET_LEAGUES,
      payload: leagues,
    });
    getPlayers(dispatch)
    alert("Applied successfully!");
  } catch (error) {
    dispatch({
      type: GET_LEAGUES,
      payload: [],
    });
    alert("Failed to apply!");
  }
};
export const openDeleteLeagueDialog = (payload) => ({
  type: OPEN_DELETE_LEAGUE_DIALOG,
  payload: payload,
});

export const setSelectedLeague = (payload) => ({
  type: SET_SELECTED_LEAGUE,
  payload: payload,
});

// Players

export const getPlayers = async (dispatch) => {
  try {
    const response = await axios.get(apis.getPlayers);

    const players = response.data.players;
    // players.map(player=>{
    //   const avatarUrl = apis.userAvatarURL(player.userId);
    //   player.avatar = avatarUrl;
    // })
    dispatch({
      type: GET_PLAYERS,
      payload: players,
    });
  } catch (error) {
    dispatch({
      type: GET_PLAYERS,
      payload: [],
    });
  }
};

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
export const openInvitePlayerDialog = (payload) => ({
  type: OPEN_INVITE_PLAYER_DIALOG,
  payload: payload,
});

export const invitePlayer = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.invitePlayer, data);
    alert(response.data.message);
  } catch (error) {
    alert(error);
  }
};

export const removeFromLeague = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.removeFromLeague, data);
    const players = response.data.players;
    dispatch({
      type: GET_PLAYERS,
      payload: players,
    });
  } catch (error) {
    dispatch({
      type: GET_PLAYERS,
      payload: [],
    });
  }
};

export const addPassword = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.addPassword, data);
    const leagues = response.data.leagues;
    dispatch({
      type: GET_LEAGUES,
      payload: leagues,
    });
    alert("Password set!");
  } catch (error) {
    dispatch({
      type: GET_LEAGUES,
      payload: [],
    });
    alert("Failed!");
  }
};

export const removePassword = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.removePassword, data);
    const leagues = response.data.leagues;
    // set logo image to all leagues
    leagues.map((league) => {
      const logoUrl = apis.leagueLogoURL(league.userId, league.id);
      league.logo = logoUrl;
    });
    dispatch({
      type: GET_LEAGUES,
      payload: leagues,
    });
    alert("Password removed!");
  } catch (error) {
    dispatch({
      type: GET_LEAGUES,
      payload: [],
    });
    alert("Failed!");
  }
};

// Teams
export const getTeams = async (dispatch) => {
  try {
    const response = await axios.get(apis.getTeams);
    const teams = response.data.teams;
    teams.map((team) => {
      const logoUrl = apis.teamLogoURL(team.userId, team.id);
      team.logo = logoUrl;
    });

    dispatch({
      type: GET_TEAMS,
      payload: teams,
    });
  } catch (error) {
    dispatch({
      type: GET_TEAMS,
      payload: [],
    });
  }
};

export const updateTeam = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.updateTeam, data);
    const teams = response.data.teams;
    teams.map((team) => {
      const logoUrl = apis.teamLogoURL(team.userId, team.id);
      team.logo = logoUrl;
    });

    dispatch({
      type: GET_TEAMS,
      payload: teams,
    });
  } catch (error) {
    dispatch({
      type: GET_TEAMS,
      payload: [],
    });
  }
  dispatch({
    type: CLOSE_TEAM_DIALOG,
  });
};

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

// Matches
export const getMatches = async (dispatch) => {
  try {
    const response = await axios.get(apis.getMatchtes);
    const matches = response.data.matches;
    dispatch({
      type: GET_MATCHES,
      payload: matches,
    });
  } catch (error) {
    dispatch({
      type: GET_LEAGUES,
      payload: [],
    });
  }
};

export const createMatch = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.createMatch, data);
    const matches = response.data.matches;
    dispatch({
      type: GET_MATCHES,
      payload: matches,
    });
  } catch (error) {
    dispatch({
      type: GET_MATCHES,
      payload: [],
    });
  }
};

export const updateMatch = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.updateMatch, data);
    const matches = response.data.matches;
    dispatch({
      type: GET_MATCHES,
      payload: matches,
    });
  } catch (error) {
    dispatch({
      type: GET_MATCHES,
      payload: [],
    });
  }
};

export const deleteMatch = async (dispatch, matchId) => {
  try {
    const response = await axios.get(apis.deleteMatch(matchId));
    const matches = response.data.matches;
    dispatch({
      type: GET_MATCHES,
      payload: matches,
    });
    getTeams(dispatch);
    getPlayers(dispatch);
    alert("Deleted successfully!");
  } catch (error) {
    dispatch({
      type: GET_MATCHES,
      payload: [],
    });
    alert("Error occurred!");
  }
};

export const updateMatchResult = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.updateMatchResult, data);
    const matches = response.data.matches;
    dispatch({
      type: GET_MATCHES,
      payload: matches,
    });
  } catch (error) {
    dispatch({
      type: GET_MATCHES,
      payload: [],
    });
  }
};

// Matchup
export const getMatchups = async (dispatch) => {
  try {
    const response = await axios.get(apis.getMatchups);
    const matchups = response.data.matchups;
    dispatch({
      type: GET_MATCHUPS,
      payload: matchups,
    });
  } catch {
    dispatch({
      type: GET_MATCHUPS,
      payload: [],
    });
  }
};

export const completeMatchup = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.completeMatchup, data);

    const matchups = response.data.matchups;
    dispatch({
      type: GET_MATCHUPS,
      payload: matchups,
    });
    getMatches(dispatch);
    getTeams(dispatch);
    alert("Completed matchup!");
  } catch {
    dispatch({
      type: GET_MATCHUPS,
      payload: [],
    });
  }
};

export const incompleteMatchup = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.incompleteMatchup, data);

    const matchups = response.data.matchups;
    dispatch({
      type: GET_MATCHUPS,
      payload: matchups,
    });
    getMatches(dispatch);
    getTeams(dispatch);
    alert("Incompleted matchup!");
  } catch {
    dispatch({
      type: GET_MATCHUPS,
      payload: [],
    });
  }
};

// Logs
export const getLogs = async (dispatch) => {
  try {
    const response = await axios.get(apis.getLogs);
    const logs = response.data.logs;
    dispatch({
      type: GET_LOGS,
      payload: logs,
    });
  } catch {
    dispatch({
      type: GET_LOGS,
      payload: [],
    });
  }
};

export const createOneLog = (dispatch, data) => {
  try {
    axios
      .post(apis.createOneLog, data)
      .then((res) => {
        dispatch({
          type: GET_LOGS,
          payload: res.data.logs,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  } catch (error) {}
};

export const updateOneLog = (dispatch, data) => {
  try {
    axios
      .post(apis.updateOneLog, data)
      .then((res) => {
        dispatch({
          type: GET_LOGS,
          payload: res.data.logs,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  } catch (error) {}
};

export const removeLog = (dispatch, data) => {
  try {
    axios
      .post(apis.removeLog, data)
      .then((res) => {
        dispatch({
          type: GET_LOGS,
          payload: res.data.logs,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  } catch (error) {}
};



// Admin
export const getAdmins = async (dispatch) => {
  try {
    const response = await axios.get(apis.getAdmins);
    const admins = response.data.admins;

    dispatch({
      type: GET_ADMINS,
      payload: admins,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMINS,
      payload: [],
    });
  }
};

export const inviteAdmin = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.inviteAdmin, data);
    const admins = response.data.admins;
    dispatch({
      type: GET_ADMINS,
      payload: admins,
    });
    alert("Invite sent!");
  } catch (error) {
    getAdmins(dispatch)
    alert("Error occurred!");
  }
};

export const getUsers = async (dispatch) => {
  try {
    const response = await axios.get(apis.getUsers);
    const users = response.data.users;
    users.map((user) => {
      user.avatar = apis.userAvatarURL(user.id);
    });

    dispatch({ type: GET_USERS, payload: users });
  } catch (error) {
    dispatch({ type: GET_USERS, payload: [] });
  }
};

export const getUserInfo = async (dispatch, id) => {
  // const navigate = useNavigate();

  try {
    const response = await axios.get(apis.getUserInfo(id));
    const user = response.data.user;
    user.avatar = apis.userAvatarURL(id);
    dispatch({
      type: GET_USER,
      payload: user
    })
  } catch (error) {
    dispatch({
      type: GET_USER,
      payload: []
    })    
  }
  // try {
  //   axios
  //     .get(apis.getUserInfo(id))
  //     .then((res) => {
  //       const user = res.data.user;
  //       user.avatar = apis.userAvatarURL(id);
  //       dispatch({ type: GET_USER, payload: user });
  //     })
  //     .catch((error) => {
  //       localStorage.removeItem("userId");
  //       localStorage.removeItem("token");
  //       navigate("/signin");
  //     });
  // } catch (error) {
  //   dispatch({ type: GET_USER, payload: [] });
  // }
};
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(true);
//   }, 500);
// });
