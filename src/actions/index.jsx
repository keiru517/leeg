export const OPEN_CREATE_LEAGUE = 'OPEN_CREATE_LEAGUE';

export const openCreateLeague = () => ({
    type: OPEN_CREATE_LEAGUE,
    payload: true
});

export const getUserInfo = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });