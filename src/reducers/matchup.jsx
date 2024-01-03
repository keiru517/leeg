import * as actions from "../actions";

const initialState = {
    match: {},
    action_logs_dialog: {
        open:false
    },
    homeTeamFouls: 0,
    homeTeamTimeOuts: 0,
    awayTeamFouls: 0,
    awayTeamTimeOuts: 0,
    currentPeriod:1
}

const matchup = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_MATCH:
            return {
                ...state,
                match:action.payload
            }
        case actions.SET_CURRENT_PERIOD:
            return {
                ...state,
                currentPeriod:action.payload
            }
        case actions.SET_TIMER:
            return {
                ...state,
                timer: action.payload
            }
        case actions.OPEN_ACTION_LOGS_DIALOG:
            return {
                ...state,
                action_logs_dialog:{
                    open:action.payload
                }
            }
        default:
            return state;
    }
}

export default matchup;