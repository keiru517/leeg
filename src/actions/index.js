import axios from "axios";
import apis from "../utils/apis";

// setting
export const SET_DARK_MODE = "SET_DARK_MODE";
// user
export const GET_USER = "GET_USER";
export const GET_USERS = "GET_USERS";
export const UPDATE_AVATAR_URL = "UPDATE_AVATAR_URL";
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
export const OPEN_LEAGUE_DETAIL_DIALOG = "OPEN_LEAGUE_DETAIL_DIALOG";
export const CLOSE_LEAGUE_DETAIL_DIALOG = "CLOSE_LEAGUE_DETAIL_DIALOG";
export const SET_SELECTED_LEAGUE = "SET_SELECTED_LEAGUE";
export const LEAVE_LEAGUE = "LEAVE_LEAGUE";
// Blogs
export const GET_BLOGS = "GET_BLOGS";
export const OPEN_CREATE_BLOG_DIALOG = "OPEN_CREATE_BLOG_DIALOG";
export const OPEN_EDIT_BLOG_DIALOG = "OPEN_EDIT_BLOG_DIALOG";
export const CLOSE_BLOG_DIALOG = "CLOSE_BLOG_DIALOG";
// Teams
export const GET_TEAMS = "GET_TEAMS";
export const OPEN_CREATE_TEAM_DIALOG = "OPEN_CREATE_TEAM_DIALOG";
export const OPEN_EDIT_TEAM_DIALOG = "OPEN_EDIT_TEAM_DIALOG";
export const OPEN_DELETE_TEAM_DIALOG = "OPEN_DELETE_TEAM_DIALOG";
export const CLOSE_TEAM_DIALOG = "CLOSE_TEAM_DIALOG";
export const SET_TEAM_LOGO_URL = "SET_TEAM_LOGO_URL";

// Matches
export const GET_MATCH = "GET_MATCH";
export const GET_MATCHES = "GET_MATCHES";
export const OPEN_CREATE_MATCH_DIALOG = "OPEN_CREATE_MATCH_DIALOG";
export const OPEN_EDIT_MATCH_DIALOG = "OPEN_EDIT_MATCH_DIALOG";
export const CLOSE_MATCH_DIALOG = "CLOSE_MATCH_DIALOG";
export const OPEN_MATCH_STATS_DIALOG = "OPEN_MATCH_STATS_DIALOG";
export const CLOSE_MATCH_STATS_DIALOG = "CLOSE_MATCH_STATS_DIALOG";
// Matchups
export const GET_MATCHUPS = "GET_MATCHUPS";
export const GET_LOGS = "GET_LOGS";
export const OPEN_MATCHUP_SETTING_DIALOG = "OPEN_MATCHUP_SETTING_DIALOG";
export const OPEN_EDIT_EVENT_DIALOG = "OPEN_EDIT_EVENT_DIALOG";
export const OPEN_ADD_EVENT_DIALOG = "OPEN_ADD_EVENT_DIALOG";
export const CLOSE_EDIT_EVENT_DIALOG = "CLOSE_EDIT_EVENT_DIALOG";
export const OPEN_PLAYER_STATS_DIALOG = "OPEN_PLAYER_STATS_DIALOG";
export const CLOSE_PLAYER_STATS_DIALOG = "CLOSE_PLAYER_STATS_DIALOG";
export const SET_CURRENT_PERIOD = "SET_CURRENT_PERIOD";
export const OPEN_ACTION_LOGS_DIALOG = "OPEN_ACTION_LOGS_DIALOG";
export const OPEN_ACTION_BUTTONS_DIALOG = "OPEN_ACTION_BUTTONS_DIALOG";
export const CLOSE_ACTION_BUTTONS_DIALOG = "CLOSE_ACTION_BUTTONS_DIALOG";
export const SET_EVENT = "SET_EVENT";
export const SET_TIMER = "SET_TIMER";
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
export const UPDATE_PLAYER_AVATAR_URL = "UPDATE_PLAYER_AVATAR_URL";
// Substitute
export const GET_SUBSTITUES = "GET_SUBSTITUES";
export const CREATE_SUBSTITUTE = "CREATE_SUBSTITUTE";
export const REMOVE_SUBSTITUTE = "REMOVE_SUBSTITUTE";

export const OPEN_ADD_SUBSTITUTE_DIALOG = "OPEN_ADD_SUBSTITUTE_DIALOG";
export const CLOSE_ADD_SUBSTITUTE_DIALOG = "CLOSE_ADD_SUBSTITUTE_DIALOG";

// Lineups
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
    getPlayers(dispatch);
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

// Players
export const getPlayers = async (dispatch) => {
  try {
    const response = await axios.get(apis.getPlayers);

    const players = response.data.players;
    players.map(player=>{
      if (!player.userId && player.avatar) {
        const avatarUrl = apis.playerAvatarURL(player.id);
        player.avatar = avatarUrl;
      }
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

export const createPlayer = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.createPlayer, data)
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

export const updatePlayer = async (dispatch, playerId, chosenFile, firstName, lastName, jerseyNumber, position) => {
  try {
    const formData = new FormData();
    formData.append("playerId", playerId);
    formData.append("avatar", chosenFile);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("jerseyNumber", jerseyNumber);
    formData.append("position", position);
    // const response = await axios.post(apis.updatePlayer, formData)
    const response =  await axios.post(apis.updatePlayer, formData)
    console.log("players", response)
    const players = response.data.players;
    players.map(player=>{
      if (!player.userId) {
        const avatarUrl = apis.playerAvatarURL(player.id);
        player.avatar = avatarUrl;
      }
    })
    dispatch({
     type: GET_PLAYERS,
     payload: players,
   });
    if (chosenFile) dispatch({type: UPDATE_PLAYER_AVATAR_URL, payload: {id:playerId, avatar: URL.createObjectURL(chosenFile)}})
    else dispatch({type: UPDATE_PLAYER_AVATAR_URL, payload: {id:playerId, avatar: null}})
  } catch (error) {
    dispatch({
      type: GET_PLAYERS,
      payload: [],
    });
  }
}
export const uploadPlayerAvatar = async (dispatch, playerId, chosenFile) => {
  try {
    const formData = new FormData();
    formData.append("playerId", playerId)
    formData.append("avatar", chosenFile)
    const response = await axios.post(apis.uploadPlayerAvatar, formData)
    const players = response.data.players;
    players.map(player=>{
      if (!player.userId) {
        const avatarUrl = apis.playerAvatarURL(player.id);
        player.avatar = avatarUrl;
      }
    })
    dispatch({
     type: GET_PLAYERS,
     payload: players,
   });
    if (chosenFile) dispatch({type: UPDATE_PLAYER_AVATAR_URL, payload: {id:playerId, avatar: URL.createObjectURL(chosenFile)}})
  } catch (error) {
    dispatch({
      type: GET_PLAYERS,
      payload: [],
    });
  }
}
export const RemovePlayer = (payload) => ({
  type: REMOVE_PLAYER,
  payload: payload,
});

// Substitutue
export const getSubstitutes = async (dispatch) => {
  try {
    const response = await axios.get(apis.getSubstitutes);
    const substitutes = response.data.substitutes;
    dispatch({
      type: GET_SUBSTITUES,
      payload: substitutes,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBSTITUES,
      payload: [],
    });
  }
};

export const createSubstitute = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.createSubstitute, data);
    const matchups = response.data.matchups;
    matchups.map(matchup=>{
      if (!matchup.player.userId && matchup.player.avatar) {
        const avatarUrl = apis.playerAvatarURL(matchup.player.id);
        matchup.player.avatar = avatarUrl;
      }
    })
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

export const removeSubstitute = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.removeSubstitute, data);
    const matchups = response.data.matchups;
    matchups.map(matchup=>{
      if (!matchup.player.userId && matchup.player.avatar) {
        const avatarUrl = apis.playerAvatarURL(matchup.player.id);
        matchup.player.avatar = avatarUrl;
      }
    })
    dispatch({
      type: GET_MATCHUPS,
      payload: matchups,
    });
    getLogs(dispatch)
  } catch {
    dispatch({
      type: GET_MATCHUPS,
      payload: [],
    });
  }
};

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
// Blogs
export const getBlogs = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.getBlogs, data);
    const blogs = response.data.blogs;
    dispatch({
      type: GET_BLOGS,
      payload: blogs
    })
  } catch (error) {
    dispatch({
      type: GET_BLOGS,
      payload: []
    })
  }
}
export const createBlog = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.createBlog, data);
    const blogs = response.data.blogs;
    dispatch({
      type: GET_BLOGS,
      payload: blogs
    })

  } catch (error) {
    dispatch({
      type: GET_BLOGS,
      payload: []
    })
  }
}

export const updateBlog = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.updateBlog, data);
    const blogs = response.data.blogs;
    dispatch({
      type: GET_BLOGS,
      payload: blogs
    })

  } catch (error) {
    dispatch({
      type: GET_BLOGS,
      payload: []
    })
  }
}

export const deleteBlog = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.deleteBlog, data);
    const blogs = response.data.blogs;
    dispatch({
      type: GET_BLOGS,
      payload: blogs
    })

  } catch (error) {
    dispatch({
      type: GET_BLOGS,
      payload: []
    })
  }
}
// Comments
export const createComment = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.createComment, data);
    const blogs = response.data.blogs;
    dispatch({
      type: GET_BLOGS,
      payload: blogs
    })

  } catch (error) {
    dispatch({
      type: GET_BLOGS,
      payload: []
    })
  }
}

export const updateComment = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.updateComment, data);
    const blogs = response.data.blogs;
    dispatch({
      type: GET_BLOGS,
      payload: blogs
    })

  } catch (error) {
    dispatch({
      type: GET_BLOGS,
      payload: []
    })
  }
}

export const deleteComment = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.deleteComment, data);
    const blogs = response.data.blogs;
    dispatch({
      type: GET_BLOGS,
      payload: blogs
    })

  } catch (error) {
    dispatch({
      type: GET_BLOGS,
      payload: []
    })
  }
}
// Replies
export const createReply = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.createReply, data);
    const blogs = response.data.blogs;
    dispatch({
      type: GET_BLOGS,
      payload: blogs
    })

  } catch (error) {
    dispatch({
      type: GET_BLOGS,
      payload: []
    })
  }
}

export const updateReply = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.updateReply, data);
    const blogs = response.data.blogs;
    dispatch({
      type: GET_BLOGS,
      payload: blogs
    })

  } catch (error) {
    dispatch({
      type: GET_BLOGS,
      payload: []
    })
  }
}

export const removeReply = async (dispatch, id) => {
  try {
    const response = await axios.get(apis.removeReply(id));
    const blogs = response.data.blogs;
    dispatch({
      type: GET_BLOGS,
      payload: blogs
    })

  } catch (error) {
    dispatch({
      type: GET_BLOGS,
      payload: []
    })
  }
}

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

export const updateTeam = async (dispatch, data, id, chosenFile) => {
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
    if (chosenFile) dispatch({ type: SET_TEAM_LOGO_URL, payload: { id: id, logoUrl: URL.createObjectURL(chosenFile) } })
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
export const getMatch = async (dispatch, matchId) => {
  try {
    const response = await axios.get(apis.getMatch(matchId));
    const match = response.data.match;
    dispatch({
      type: GET_MATCH,
      payload: match,
    });
  } catch (error) {
    dispatch({
      type: GET_MATCH,
      payload: [],
    });
  }
};

export const getMatches = async (dispatch) => {
  try {
    const response = await axios.get(apis.getMatches);
    const matches = response.data.matches;
    matches.map(match => {
      const homeTeamlogoUrl = apis.teamLogoURL(match.homeTeam.userId, match.homeTeam.id);
      const awayTeamlogoUrl = apis.teamLogoURL(match.awayTeam.userId, match.awayTeam.id);
      match.homeTeam.logo = homeTeamlogoUrl;
      match.awayTeam.logo = awayTeamlogoUrl;
    });

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

export const createMatch = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.createMatch, data);
    const matches = response.data.matches;
    matches.map(match => {
      const homeTeamlogoUrl = apis.teamLogoURL(match.homeTeam.userId, match.homeTeam.id);
      const awayTeamlogoUrl = apis.teamLogoURL(match.awayTeam.userId, match.awayTeam.id);
      match.homeTeam.logo = homeTeamlogoUrl;
      match.awayTeam.logo = awayTeamlogoUrl;
    });
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
    matches.map(match => {
      const homeTeamlogoUrl = apis.teamLogoURL(match.homeTeam.userId, match.homeTeam.id);
      const awayTeamlogoUrl = apis.teamLogoURL(match.awayTeam.userId, match.awayTeam.id);
      match.homeTeam.logo = homeTeamlogoUrl;
      match.awayTeam.logo = awayTeamlogoUrl;
    });
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
    matches.map(match => {
      const homeTeamlogoUrl = apis.teamLogoURL(match.homeTeam.userId, match.homeTeam.id);
      const awayTeamlogoUrl = apis.teamLogoURL(match.awayTeam.userId, match.awayTeam.id);
      match.homeTeam.logo = homeTeamlogoUrl;
      match.awayTeam.logo = awayTeamlogoUrl;
    });
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
    matches.map(match => {
      const homeTeamlogoUrl = apis.teamLogoURL(match.homeTeam.userId, match.homeTeam.id);
      const awayTeamlogoUrl = apis.teamLogoURL(match.awayTeam.userId, match.awayTeam.id);
      match.homeTeam.logo = homeTeamlogoUrl;
      match.awayTeam.logo = awayTeamlogoUrl;
    });
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
    matchups.map(matchup=>{
      if (!matchup.player.userId && matchup.player.avatar) {
        const avatarUrl = apis.playerAvatarURL(matchup.player.id);
        matchup.player.avatar = avatarUrl;
      }
    })
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

    const match = response.data.match;
    dispatch({
      type: GET_MATCH,
      payload: match,
    });
    getMatches(dispatch);
    getTeams(dispatch);
    getMatchups(dispatch);
  } catch {
    dispatch({
      type: GET_MATCH,
      payload: [],
    });
  }
};

export const incompleteMatchup = async (dispatch, data) => {
  try {
    const response = await axios.post(apis.incompleteMatchup, data);

    const match = response.data.match;
    dispatch({
      type: GET_MATCH,
      payload: match,
    });
    getMatches(dispatch);
    getTeams(dispatch);
    getMatchups(dispatch);
  } catch {
    dispatch({
      type: GET_MATCH,
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
        getMatches(dispatch)
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  } catch (error) { }
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
  } catch (error) { }
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
  } catch (error) { }
};

export const minusLog = (dispatch, data) => {
  try {
    axios
      .post(apis.minusLog, data)
      .then((res) => {
        dispatch({
          type: GET_LOGS,
          payload: res.data.logs,
        });
        getMatches(dispatch)

      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  } catch (error) { }
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
    getAdmins(dispatch);
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
  try {
    const response = await axios.get(apis.getUserInfo(id));
    const user = response.data.user;
    user.avatar = apis.userAvatarURL(id);
    dispatch({
      type: GET_USER,
      payload: user,
    });
  } catch (error) {
    // window.location.href="/signin";
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    dispatch({
      type: GET_USER,
      payload: [],
    });
  }
};
