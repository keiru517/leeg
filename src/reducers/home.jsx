// const OPEN_CREATE_LEAGUE_DIALOG = 'OPEN_CREATE_LEAGUE_DIALOG'
import * as actions from "../actions";

const initialState = {
  leagues: [],
  teams: [],
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
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_LEAGUES:
      return { ...state, leagues: action.payload };

    case actions.OPEN_CREATE_LEAGUE_DIALOG:
      return {
        ...state,
        league_dialog: {
          open: action.payload,
          type:"create",
          league:[]
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
          type:'create',
          team:[]
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

      case actions.OPEN_ADD_PLAYER_DIALOG:
      return {
        ...state,
        team_dialog: {
          open: true,
          type: "addPlayer",
          team: action.payload
        },
      };
    default:
      return state;
  }
};

export default home;
