import axios from "axios";
import apis from "../utils/apis";
import { useNavigate } from "react-router-dom";


// user
export const GET_USER = "GET_USER";
// country
export const GET_COUNTRIES = "GET_COUNTRIES";
// league
export const GET_LEAGUES = "GET_LEAGUES";
export const OPEN_CREATE_LEAGUE_DIALOG = "OPEN_CREATE_LEAGUE_DIALOG";
export const CLOSE_LEAGUE_DIALOG = "CLOSE_LEAGUE_DIALOG";
export const OPEN_EDIT_LEAGUE_DIALOG = "OPEN_EDIT_LEAGUE_DIALOG";
export const OPEN_DELETE_LEAGUE_DIALOG = "OPEN_DELETE_LEAGUE_DIALOG";
export const SET_SELECTED_LEAGUE = "SET_SELECTED_LEAGUE";
// export const SET_LEAGUE_LOGO_URL = "SET_LOGO_URL";
// Teams
export const GET_TEAMS = "GET_TEAMS";
export const OPEN_CREATE_TEAM_DIALOG = "OPEN_CREATE_TEAM_DIALOG";
export const OPEN_EDIT_TEAM_DIALOG = "OPEN_EDIT_TEAM_DIALOG";
export const OPEN_DELETE_TEAM_DIALOG = "OPEN_DELETE_TEAM_DIALOG";
export const CLOSE_TEAM_DIALOG = "CLOSE_TEAM_DIALOG";
export const OPEN_ADD_PLAYER_DIALOG = "OPEN_ADD_PLAYER_DIALOG";
export const SET_TEAM_LOGO_URL = "SET_TEAM_LOGO_URL";

// Matches
export const GET_MATCHES = "GET_MATCHES";
export const OPEN_CREATE_MATCH_DIALOG = "OPEN_CREATE_MATCH_DIALOG";
export const CLOSE_MATCH_DIALOG = "CLOSE_MATCH_DIALOG";
// Matchups
export const GET_MATCHUPS = "GET_MATCHUPS";
// player
export const GET_PLAYERS = "GET_PLAYERS";
export const OPEN_INVITE_PLAYER_DIALOG = "OPEN_INVITE_PLAYER_DIALOG";
export const ACCEPT_PLAYER = "ACCEPT_PLAYER";
export const UNACCEPT_PLAYER = "UNACCEPT_PLAYER";
export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";

export const OPEN_ADD_SUBSTITUTE_DIALOG = "OPEN_ADD_SUBSTITUTE_DIALOG";
export const CLOSE_ADD_SUBSTITUTE_DIALOG = "CLOSE_ADD_SUBSTITUTE_DIALOG";

// Admin
export const GET_ADMINS = "GET_ADMINS";
// Tab
export const SET_TAB_ID = "SET_TAB_ID";

// get countries
export const getCountries = async (dispatch) => {
  try {
    const response = await axios.get(apis.getCountries, {
      headers: {
        'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_API_KEY
      }
    });
    console.log(response.data)
    dispatch({
      type: GET_COUNTRIES,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_COUNTRIES,
      payload: []
    })
  }
}

// league actions----------------------------------

// Get leagues from the server
export const getLeagues = async (dispatch, userId) => {

  try {
    const response = await axios.post(apis.getLeagues, {userId});
    const leagues = response.data.leagues;

    // set logo image to all leagues
    leagues.map(league=>{
      const logoUrl = apis.leagueLogoURL(league.userId, league.id);
      league.logo = logoUrl;
      // dispatch({
      //   type: SET_LEAGUE_LOGO_URL,
      //   payload: { id: league.id, logoUrl: logoUrl },
      // });
    })
    dispatch({
      type: GET_LEAGUES,
      payload: leagues,
    });
  } catch (error) {
    console.log(error.response.status)
    if (error.response.status == 401) {
      console.log("hi")
    }
    dispatch({
      type: GET_LEAGUES,
      payload: [],
    });
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

// export const setLeagueLogoUrl = (payload) => ({
//   type: SET_LEAGUE_LOGO_URL,
//   payload: payload,
// });

// Players
export const openInvitePlayerDialog = (payload) => ({
  type: OPEN_INVITE_PLAYER_DIALOG,
  payload: payload,
});

// Team actions -----------------------------------
export const getTeams = async (dispatch) => {
  try {
    const response = await axios.get(apis.getTeams);
    const teams = response.data.teams;
    teams.map(team=>{
      const logoUrl = apis.teamLogoURL(team.id);
      team.logo = logoUrl;
    });

    dispatch({
      type: GET_TEAMS,
      payload: teams,
    });

    // teams.map(team=>{
    //   const logoUrl = apis.teamLogoURL(team.id);
    //   dispatch({
    //       type: SET_TEAM_LOGO_URL,
    //       payload: { id: team.id, logoUrl: logoUrl}
    //   })
    // })

  } catch (error) {
    dispatch({
      type: GET_TEAMS,
      payload: [],
    });
  }
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

// Matches Action
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

export const closeMatchDialog = () => ({
  type: CLOSE_MATCH_DIALOG,
});
// matchup action
export const getMatchups = async (dispatch) => {
  try{
    const response = await axios.get(apis.getMatchups);
    const matchups = response.data.matchups;
    dispatch({
      type: GET_MATCHUPS,
      payload: matchups
    })
  } catch {
    dispatch({
      type: GET_MATCHUPS,
      payload: []
    })

  }
}

// player action
export const getPlayers = async (dispatch, leagueId) => {
  try {
    const response = await axios.get(apis.getPlayers);
    console.log("player action")
    const players = response.data.players;
    players.map(player=>{
      const avatarUrl = apis.userAvatarURL(player.id);
      player.avatar = avatarUrl;
    })
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

// Admin
export const getAdmins = (payload) => ({
  type: GET_ADMINS,
  payload: payload,
});

export const getUserInfo = async (dispatch, id) => {

  try {
    const response = await axios.get(apis.getUserInfo(id));
    const user = response.data.user;
    user.avatar = apis.userAvatarURL(id);
    dispatch({type: GET_USER, payload: user});
  } catch (error) {
    console.log(error)
  }
}
  // new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(true);
  //   }, 500);
  // });
