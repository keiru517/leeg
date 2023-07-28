// league
export const OPEN_CREATE_LEAGUE = 'OPEN_CREATE_LEAGUE';
export const GET_LEAGUES = 'GET_LEAGUES';

// league actions----------------------------------
// Open Create League Dialogue
export const openCreateLeague = () => ({
    type: OPEN_CREATE_LEAGUE,
    payload: true
});

// Get leagues from the server
export const getLeagues = (payload) => ({
  type: GET_LEAGUES,
  payload: payload 
})

export const getUserInfo = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });