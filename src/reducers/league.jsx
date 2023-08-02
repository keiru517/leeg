// const OPEN_CREATE_LEAGUE_DIALOG = 'OPEN_CREATE_LEAGUE_DIALOG'
import * as actions from "../actions";

const initialState = {
  // tab:'rosters',
  teams: [],
  league_dialog_open: false,
  league_dialog_type: "",
  dialog_open: false,
  dialog_type: "create",
  create_team_dialog:{
    open:false
  },
  edit_team_dialog: {
    open:false,
    team:""
  },
};

const league = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_LEAGUE_DIALOG:
      return { ...state, league_dialog_open: action.payload };

    case actions.UPDATE_LEAGUE_DIALOG_TYPE:
      return { ...state, league_dialog_type: action.payload };

    case actions.UPDATE_DIALOG_TYPE:
      return { ...state, dialog_type: action.payload };

    case actions.OPEN_TEAM_DIALOG:
      return { ...state, dialog_open: action.payload };

    // case actions.OPEN_TEAM_EDIT_DIALOG:
    //     return { ...state, edit_team_dialog:action.payload}
    case actions.OPEN_ROSTER_DIALOG:
      return {
        ...state,
        dialog_open: action.payload,
      };

    case actions.GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };

    default:
      return state;
  }
};

export default league;
