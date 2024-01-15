import * as actions from "../actions";

const initialState = {
  match: {},
  action_logs_dialog: {
    open: false,
  },
  action_buttons_dialog: {
    open: false,
    teamId: "",
    time: "",
  },
  homeTeamFouls: 0,
  homeTeamTimeOuts: 0,
  awayTeamFouls: 0,
  awayTeamTimeOuts: 0,
  currentPeriod: 1,
  event: "",
};

const matchup = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_MATCH:
      return {
        ...state,
        match: action.payload,
      };
    case actions.SET_CURRENT_PERIOD:
      return {
        ...state,
        currentPeriod: action.payload,
      };
    case actions.SET_TIMER:
      return {
        ...state,
        action_buttons_dialog: {
          ...state.action_buttons_dialog,
          time: action.payload,
        },
      };
    case actions.OPEN_ACTION_LOGS_DIALOG:
      return {
        ...state,
        action_logs_dialog: {
          open: action.payload,
        },
      };
    case actions.OPEN_ACTION_BUTTONS_DIALOG:
      return {
        ...state,
        action_buttons_dialog: {
          open: action.payload.open,
          teamId: action.payload.teamId,
          time: action.payload.time,
        },
      };
    case actions.CLOSE_ACTION_BUTTONS_DIALOG:
      return {
        ...state,
        action_buttons_dialog: {
          ...state.action_buttons_dialog,
          open: false,
        },
      };
    case actions.SET_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    default:
      return state;
  }
};

export default matchup;
