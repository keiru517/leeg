// const OPEN_CREATE_LEAGUE_DIALOG = 'OPEN_CREATE_LEAGUE_DIALOG'
import * as actions from "../actions";

const initialState = {
  user: {},
  countries: [],
  leagues: [],
  teams: [],
  matches: [],
  matchups: [],
  players: [],
  admins: [],
  selected_league: [],
  tab: 0,
  league_dialog: {
    open: false,
    type: "create",
    league: [],
  },
  player_dialog: {
    open: false,
  },
  team_dialog: {
    open: false,
    type: "create",
    team: [],
  },
  match_dialog: {
    open: false,
    type: "",
    match: [],
  },
  substitute_dialog: {
    open: false,
    type: "",
  },
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USER:
      return { ...state, user: action.payload };
    case actions.GET_COUNTRIES:
      return { ...state, countries: action.payload };
    case actions.GET_LEAGUES:
      return { ...state, leagues: action.payload };

    case actions.OPEN_CREATE_LEAGUE_DIALOG:
      return {
        ...state,
        league_dialog: {
          open: action.payload,
          type: "create",
          league: [],
        },
      };

    case actions.CLOSE_LEAGUE_DIALOG:
      return {
        ...state,
        league_dialog: {
          open: false,
          type: "",
          league: [],
        },
      };

    case actions.OPEN_EDIT_LEAGUE_DIALOG:
      return {
        ...state,
        league_dialog: {
          open: true,
          type: "edit",
          league: action.payload,
        },
      };

    case actions.OPEN_DELETE_LEAGUE_DIALOG:
      return {
        ...state,
        league_dialog: {
          open: true,
          type: "delete",
          league: action.payload,
        },
      };

    case actions.SET_SELECTED_LEAGUE:
      return {
        ...state,
        selected_league: action.payload,
      };

    case actions.SET_LEAGUE_LOGO_URL:
      return {
        ...state,
        leagues: state.leagues.map((league) =>
          league.id == action.payload.id
            ? { ...league, logo: action.payload.logoUrl }
            : league
        ),
      };

    // Team
    case actions.GET_TEAMS:
      return { ...state, teams: action.payload };

    case actions.OPEN_INVITE_PLAYER_DIALOG:
      return {
        ...state,
        player_dialog: {
          ...state.player_dialog,
          open: action.payload,
        },
      };

    case actions.OPEN_CREATE_TEAM_DIALOG:
      return {
        ...state,
        team_dialog: {
          open: action.payload,
          type: "create",
          team: [],
        },
      };

    case actions.OPEN_EDIT_TEAM_DIALOG:
      return {
        ...state,
        team_dialog: {
          open: true,
          type: "edit",
          team: action.payload,
        },
      };

    case actions.CLOSE_TEAM_DIALOG:
      return {
        ...state,
        team_dialog: {
          open: false,
          type: "",
          team: [],
        },
      };

    case actions.SET_TEAM_LOGO_URL:
      return {
        ...state,
        teams: state.teams.map((team) =>
          team.id == action.payload.id
            ? {
                ...team,
                logo: action.payload.logoUrl,
              }
            : team
        ),
      };

    // match
    case actions.GET_MATCHES:
      return {
        ...state,
        matches: action.payload,
      };

    case actions.OPEN_CREATE_MATCH_DIALOG:
      return {
        ...state,
        match_dialog: {
          open: true,
          type: "create",
          team: [],
        },
      };

    case actions.CLOSE_MATCH_DIALOG:
      return {
        ...state,
        match_dialog: {
          open: false,
          type: "",
          team: [],
        },
      };

    // matchups
    case actions.GET_MATCHUPS:
      return {
        ...state,
        matchups: action.payload,
      };

    case actions.OPEN_ADD_PLAYER_DIALOG:
      return {
        ...state,
        team_dialog: {
          open: true,
          type: "addPlayer",
          team: action.payload,
        },
      };

    case actions.OPEN_DELETE_TEAM_DIALOG:
      return {
        ...state,
        team_dialog: {
          open: true,
          type: "delete",
          team: action.payload,
        },
      };

    case actions.GET_PLAYERS:
      return {
        ...state,
        players: action.payload,
      };

    case actions.GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };

    case actions.OPEN_ADD_SUBSTITUTE_DIALOG:
      return {
        ...state,
        substitute_dialog: {
          open: true,
        },
      };

    case actions.CLOSE_ADD_SUBSTITUTE_DIALOG:
      return {
        ...state,
        substitute_dialog: {
          open: false,
        },
      };
    // Tab
    case actions.SET_TAB_ID:
      return {
        ...state,
        tab: action.payload,
      };
    default:
      return state;
  }
};

export default home;
