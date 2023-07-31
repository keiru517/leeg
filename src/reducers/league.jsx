// const OPEN_CREATE_LEAGUE = 'OPEN_CREATE_LEAGUE'
import * as actions from '../actions';

const initialState = {
    // tab:'rosters',
    dialog_open: false,
    dialog_type:'create'
}

const league = (state=initialState, action) => {
    switch (action.type){
        case actions.UPDATE_DIALOG_TYPE:
            return {...state,
                dialog_type: action.payload
                }
        case actions.OPEN_TEAM_DIALOG:
            return {...state,
                dialog_open: action.payload
                }
        case actions.OPEN_ROSTER_DIALOG:
            return {
                ...state,
                dialog_open: action.payload
            }
        default:
            return state;

    }

}



export default league;