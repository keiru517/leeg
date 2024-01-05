import { combineReducers } from "redux";
import home from "./home";
import matchup from "./matchup";

const leeg = combineReducers({ home, matchup });

export default leeg;
