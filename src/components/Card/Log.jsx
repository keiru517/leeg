import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../../utils/apis";
import league_logo from "../../assets/img/dark_mode/league-logo.png";
import editIconDark from "../../assets/img/dark_mode/edit-icon-dark.svg";
import editIconLight from "../../assets/img/dark_mode/edit-icon-light.svg";
import deleteIconDark from "../../assets/img/dark_mode/delete-icon-dark.svg";
import deleteIconLight from "../../assets/img/dark_mode/delete-icon-light.svg";

const Log = (props) => {
  const {id, log, removeLogById } = props;
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.home.dark_mode);
  
  const player = useSelector((state) => state.home.matchups).find(
    (matchup) => matchup.playerId == log.playerId
  ).player;
  const user = useSelector((state) => state.home.user);
  const team  = useSelector(state=>state.home.teams).find(team=>team.id == log.teamId);

  const handleEdit = () => {
    dispatch({type:actions.OPEN_EDIT_EVENT_DIALOG, payload:id})
  }
  const handleDelete = () => {
    console.log("you clicked the id", id);
    removeLogById(id);
  };

  return (
    <div className="bg-light-charcoal dark:bg-[#595959] text-black dark:text-white rounded-lg h-28">
      <div className="flex justify-between">
        <div className="flex space-x-3 h-[51px] items-center p-4">
          <p className="text-black dark:text-white font-medium text-lg">
            P{log.period}
          </p>
          <p className="text-black dark:text-white font-medium text-lg">
            {log.time}
          </p>
          {/* <p className="text-black dark:text-white font-medium text-lg">
            {log.homeTeamPoints} - {log.awayTeamPoints}
          </p> */}
        </div>
        <div className="flex space-x-3 h-[51px] items-center p-4">
          <img
            src={darkMode ? editIconDark : editIconLight}
            alt=""
            className="w-4.5 h-4.5 cursor-pointer"
            onClick={handleEdit}
          />
          <img
            src={darkMode ? deleteIconDark : deleteIconLight}
            alt=""
            className="w-4.5 h-4.5 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
      <hr className="border border-[#686868] w-full" />
      <div className="flex justify-between">
        <div className="flex space-x-3 h-[51px] items-center p-4 justify-between">
          <p className="text-black dark:text-white font-medium text-lg">
            {log.event.split(" ")[0]}
          </p>
          <p className="text-black dark:text-white font-medium text-lg">&gt;</p>
          <p className="text-black dark:text-white font-medium text-lg">
            #{player?.jerseyNumber}
          </p>
          <p className="text-black dark:text-white font-medium text-lg">
            {player?.firstName[0]} {player?.lastName}
          </p>
          <img src={player?.avatar} alt="" className="w-8 h-8 rounded-full"/>
          <img src={team?.logo} alt="" className="w-8 h-8 rounded-full"/>
        </div>
        <div className="flex space-x-3 h-[51px] items-center p-4">
          <p className="text-black dark:text-gray-300 font-medium text-sm">
            Added by: {user?.firstName[0]}.{user?.lastName[0]}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Log;
