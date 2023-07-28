// const OPEN_CREATE_LEAGUE = 'OPEN_CREATE_LEAGUE'
import * as actions from '../actions';

const initialState = {
    league_dialog_open: false,
    leagues: []
}

const home = (state=initialState, action) => {
    switch (action.type){
        case actions.OPEN_CREATE_LEAGUE:
            return {...state,
                league_dialog_open: action.payload
                }
        case actions.GET_LEAGUES:
            return {...state, 
                leagues: action.payload
            }
        default:
            return state;

    }

}



export default home;