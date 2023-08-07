// league
export const GET_LEAGUES = 'GET_LEAGUES';
export const OPEN_CREATE_LEAGUE_DIALOG = 'OPEN_CREATE_LEAGUE_DIALOG';
export const CLOSE_LEAGUE_DIALOG = 'CLOSE_LEAGUE_DIALOG'
export const OPEN_EDIT_LEAGUE_DIALOG = 'OPEN_EDIT_LEAGUE_DIALOG';
export const OPEN_DELETE_LEAGUE_DIALOG = 'OPEN_DELETE_LEAGUE_DIALOG';
// Teams
export const GET_TEAMS = 'GET_TEAMS';
export const OPEN_CREATE_TEAM_DIALOG = 'OPEN_CREATE_TEAM_DIALOG'
export const OPEN_EDIT_TEAM_DIALOG = 'OPEN_EDIT_TEAM_DIALOG'
export const OPEN_DELETE_TEAM_DIALOG = 'OPEN_DELETE_TEAM_DIALOG'
export const CLOSE_TEAM_DIALOG = 'CLOSE_TEAM_DIALOG'
export const OPEN_ADD_PLAYER_DIALOG = 'OPEN_ADD_PLAYER_DIALOG'

// Matches 
export const GET_MATCHES = 'GET_MATCHES';
export const OPEN_CREATE_MATCH_DIALOG = 'OPEN_CREATE_MATCH_DIALOG';
export const CLOSE_MATCH_DIALOG = 'CLOSE_MATCH_DIALOG';
// player
export const OPEN_INVITE_PLAYER_DIALOG = 'OPEN_INVITE_PLAYER_DIALOG';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';


// league actions----------------------------------

// Get leagues from the server
export const getLeagues = (payload) => ({
  type: GET_LEAGUES,
  payload: payload 
})

// create
export const openCreateLeagueDialog = (payload) => ({
    type: OPEN_CREATE_LEAGUE_DIALOG,
    payload: payload
});

export const closeLeagueDialog = () => ({
    type: CLOSE_LEAGUE_DIALOG,
});

export const openEditLeagueDialog = (payload) => ({
  type: OPEN_EDIT_LEAGUE_DIALOG,
  payload:payload
})

export const openDeleteLeagueDialog = (payload) => ({
  type: OPEN_DELETE_LEAGUE_DIALOG,
  payload:payload
})


// Players
export const openInvitePlayerDialog = (payload) => ({
  type: OPEN_INVITE_PLAYER_DIALOG,
  payload:payload
})



// Team actions -----------------------------------
export const getTeams = (payload) => ({
  type: GET_TEAMS,
  payload: payload 
})

export const openCreateTeamDialog = (payload) => ({
  type: OPEN_CREATE_TEAM_DIALOG,
  payload: payload
})

export const closeTeamDialog = () => ({
  type: CLOSE_TEAM_DIALOG,
})

export const openEditTeamDialog = (payload) => ({
  type: OPEN_EDIT_TEAM_DIALOG,
  payload: payload
})

export const openDeleteTeamDialog = (payload) => ({
  type: OPEN_DELETE_TEAM_DIALOG,
  payload: payload
})

export const openAddPlayerDialgo = (payload) => ({
  type: OPEN_ADD_PLAYER_DIALOG,
  payload:payload
})

// Matches Action
export const getMatches = (payload) =>({ 
  type: GET_MATCHES,
  payload: payload
})

export const closeMatchDialog = () => ({
  type: CLOSE_MATCH_DIALOG
})

// player action
export const AddPlayer = (payload) => ({
  type: ADD_PLAYER,
  payload:payload
})

export const RemovePlayer = (payload) => ({
  type: REMOVE_PLAYER,
  payload:payload
})

// // Team
// export const openTeamEditDialog = (payload) => ({
//   type: OPEN_TEAM_EDIT_DIALOG,
//   payload:payload
// })



export const getUserInfo = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });