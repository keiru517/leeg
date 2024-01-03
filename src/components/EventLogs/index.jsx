import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import * as actions from "../../actions";
import Log from "../../components/Card/Log";
import plusIconDark from "../../assets/img/dark_mode/plus-icon-dark.svg";
import plusIconLight from "../../assets/img/dark_mode/plus-icon-light.svg";
import downloadIconDark from "../../assets/img/dark_mode/download-icon-dark.svg";
import downloadIconLight from "../../assets/img/dark_mode/download-icon-light.svg";
import settingIconDark from "../../assets/img/dark_mode/setting-icon-dark.svg";
import settingIconLight from "../../assets/img/dark_mode/setting-icon-light.svg";

const Index = (props) => {
  let { leagueId, matchId } = useParams();
  let {className} = props
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.home.dark_mode);
  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );

  const allLogs = useSelector((state) => state.home.logs)
    .filter((log) => log.leagueId == leagueId && log.matchId == matchId)
    .sort((a, b) => {
      const timeA = a.time;
      const timeB = b.time;

      // Convert time strings into numbers for comparison
      const [minutesA, secondsA] = timeA.split(":").map(Number);
      const [minutesB, secondsB] = timeB.split(":").map(Number);

      if (a.period !== b.period) {
        return a.period - b.period; // Sort in ascending order by period
      }

      // Compare minutes and seconds
      if (minutesA !== minutesB) {
        return minutesB - minutesA;
      } else {
        return secondsB - secondsA;
      }
    });

  const handleSetting = () => {
    if (match?.isNew) {
      dispatch({ type: actions.OPEN_MATCHUP_SETTING_DIALOG, payload: true });
    } else {
      alert("The matchup is completed!");
    }
  };

  const handleAddEvent = () => {
    if (match?.isNew) {
      // if (isRunning) {
      dispatch({ type: actions.OPEN_ADD_EVENT_DIALOG });
      // } else {
      //   alert("Please run the timer!")
      // }
    } else {
      alert("The matchup is completed!");
    }
  };

  return (
    <div className={`${className} flex-col rounded-main bg-white dark:bg-slate p-default`}>
      <div className="flex justify-between mb-5">
        <p className="text-black dark:text-white">Action Log</p>
        <div className="flex items-center space-x-5">
          <img
            onClick={handleSetting}
            src={darkMode ? settingIconDark : settingIconLight}
            alt=""
            className="w-4 h-4 cursor-pointer"
          />
          <img
            onClick={handleAddEvent}
            src={darkMode ? plusIconDark : plusIconLight}
            alt=""
            className="w-3 h-3 cursor-pointer"
          />
          <img
            src={darkMode ? downloadIconDark : downloadIconLight}
            alt=""
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
      <div className="space-y-3 overflow-y-auto">
        {Object.values(allLogs).map((log, idx) => (
          <Log key={idx} log={log} id={log.id}></Log>
        ))}
      </div>
    </div>
  );
};

export default Index;
