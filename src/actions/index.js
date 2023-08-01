// league
export const OPEN_CREATE_LEAGUE = 'OPEN_CREATE_LEAGUE';
export const GET_LEAGUES = 'GET_LEAGUES';

export const OPEN_LEAGUE_DIALOG = 'OPEN_LEAGUE_DIALOG';
export const UPDATE_LEAGUE_DIALOG_TYPE = 'UPDATE_LEAGUE_DIALOG_TYPE';

export const UPDATE_DIALOG_TYPE = 'UPDATE_DIALOG_TYPE'
export const OPEN_ROSTER_DIALOG = 'OPEN_ROSTER_DIALOG'; 
export const OPEN_TEAM_DIALOG = 'OPEN_TEAM_DIALOG'; 
export const OPEN_MATCH_DIALOG = 'OPEN_MATCH_DIALOG'; 
export const OPEN_STANDING_DIALOG = 'OPEN_STANDING_DIALOG'; 

export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
// league actions----------------------------------
// Open Create League Dialog
export const openCreateLeague = () => ({
    type: OPEN_CREATE_LEAGUE,
    payload: true
});

// Get leagues from the server
export const getLeagues = (payload) => ({
  type: GET_LEAGUES,
  payload: payload 
})

export const openLeagueDialog = (payload) => ({
  type: OPEN_LEAGUE_DIALOG,
  payload: payload 
})

export const UpdateLeagueDialogType = (payload) => ({
  type: UPDATE_DIALOG_TYPE,
  payload: payload
})

// Open Team dialogue

export const UpdateDialogType = (payload) => ({
  type: UPDATE_DIALOG_TYPE,
  payload: payload
})

export const OpenRosterDialog = (payload) => ({
  type: OPEN_ROSTER_DIALOG,
  payload: payload
})
export const OpenTeamDialog = (payload) => ({
  type: OPEN_TEAM_DIALOG,
  payload: payload
})
export const OpenMatchDialog = (payload) => ({
  type: OPEN_MATCH_DIALOG,
  payload: payload
})
export const OpenStandingDialog = (payload) => ({
  type: OPEN_STANDING_DIALOG,
  payload: payload
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

export const getUserInfo = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });