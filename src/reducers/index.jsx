import { combineReducers } from "redux";
import home from "./home";
import league from "./league";

const leeg = combineReducers({ home, league });

export default leeg;
