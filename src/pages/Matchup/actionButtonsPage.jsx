import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import * as actions from "../../actions";
import SelectPlayerModal from "../../components/Modal/SelectPlayerModal";
import backIconDark from "../../assets/img/dark_mode/back-icon-dark.png";
import backIconLight from "../../assets/img/dark_mode/back-icon-light.png";

const ActionButtonsPage = () => {
  let { leagueId, matchId, teamId, time } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const darkMode = useSelector((state) => state.home.dark_mode);

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );

  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );

  const currentPeriod = useSelector(state=>state.matchup.currentPeriod);

  const handleAction = (teamId, playerId, event, isDirect, isSubstitute) => {
    actions.createOneLog(dispatch, {
      leagueId,
      matchId,
      period: 1,
      teamId,
      playerId,
      event,
      time,
      isDirect,
      isSubstitute,
    });
  };

  const [event, setEvent] = useState("");

  const handleClickButtons = (event, id) => {
    if (match?.isNew) {
      setEvent(event);
      dispatch({ type: actions.OPEN_SELECT_PLAYER_DIALOG, payload: true });
      // dispatch to show the modal
    } else {
      alert("The matchup is completed!");
    }
  };

  return (
    <div className="flex flex-col flex-grow p-default">
      <div className="flex flex-col dark:bg-slate bg-white rounded-lg mb-3 p-default">
        <div
          className="w-6 h-6 sm:w-[34px] sm:h-[34px] bg-gray-300 dark:bg-primary items-center flex justify-center rounded-default cursor-pointer hover:opacity-70"
          onClick={() => navigate(-1)}
        >
          <img
            src={darkMode ? backIconDark : backIconLight}
            alt=""
            className="w-[4px] h-[10px] dark:hover:bg-middle-gray rounded-default cursor-pointer"
          />
        </div>
        <img
          src={team?.logo}
          alt=""
          className="w-28 h-28 rounded-full mx-auto border border-gray-500"
        />
        <p className="self-center text-black dark:text-white font-semibold text-2xl mt-5 truncate w-52 text-center">
          {team?.name}
        </p>
      </div>
      <div className="flex flex-col flex-grow overflow-auto sm:mt-3">
        <div className="grid grid-cols-3 gap-3">
          <div
            className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
            onClick={() => handleClickButtons("points3", teamId)}
          >
            +3
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            +2
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            +1
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            Missed 3
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            Missed 2
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            Missed 1
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            REBOUND
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            TURNOVER
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            FOUL
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            TIMEOUT
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            BLOCK
          </div>
          <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
            ASSIST
          </div>
        </div>
      </div>
      <SelectPlayerModal
        event={event}
        teamId={teamId}
        handleAction={handleAction}
        period={currentPeriod}
      />
    </div>
  );
};

export default ActionButtonsPage;
