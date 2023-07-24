// const OPEN_CREATE_LEAGUE = 'OPEN_CREATE_LEAGUE'
import * as actions from '../actions';

const initialState = {
    league_dialog_open: false
}

const leagues = (state=initialState, action) => {
    switch (action.type){
        case actions.OPEN_CREATE_LEAGUE:
            return {...state,
                league_dialog_open: action.payload
                }
        default:
            return state;

    }

}



export default leagues;