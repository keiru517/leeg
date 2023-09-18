import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";

import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";

const PageTitle = (props) => {
  const {
    backIcon,
    logo,
    editIcon,
    button,
    children,
    createAction,
    setLeagues,
  } = props;

  let { leagueId } = useParams();
  const user = useSelector((state) => state.home.user);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const leagues = useSelector((state) => state.home.leagues);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: createAction, payload: true });
  };

  const handleEdit = () => {
    dispatch({ type: actions.OPEN_EDIT_LEAGUE_DIALOG, payload: league });
  };

  const [tab, setTab] = useState(-1);

  const handleMyleauges = () => {
    const myLeagues = leagues.filter((league) => league.userId == user?.id);
    console.log(myLeagues);
    setLeagues(myLeagues);
    setTab(1);
  };

  const handleOtherleauges = () => {
    const otherLeagues = leagues.filter((league) => league.userId !== user?.id);
    console.log(otherLeagues);
    setLeagues(otherLeagues);
    setTab(2);
  };

  const handleAllLeagues = () => {
    setLeagues(leagues)
    setTab(0)
  }


  const navigate = useNavigate();

  return (
    <div className="page-title dark:bg-charcoal bg-white flex items-center justify-between">
      <div className="flex items-center">
        {backIcon ? (
          <img
            onClick={() => navigate(-1)}
            src={backIcon}
            alt=""
            className="w-[34px] h-[34px] dark:hover:bg-middle-gray rounded-default cursor-pointer"
          />
        ) : (
          ""
        )}
        {logo ? (
          <img
            src={logo}
            // src={apis.leagueLogoURL(leagueId)}
            alt=""
            className="w-20 h-20 ml-6"
          />
        ) : (
          ""
        )}
        <p
          onClick={handleMyleauges}
          className={`text-xl dark:text-white text-charcoal text-left font-black mx-6 cursor-pointer hover:opacity-70 ${
            tab == 1 ? "border-b-2 border-sky-500 p-3" : ""
          }`}
        >
          My Leagues
        </p>
        <p
          onClick={handleOtherleauges}
          className={`text-xl dark:text-white text-charcoal text-left font-black mx-6 cursor-pointer hover:opacity-70 ${
            tab == 2 ? "border-b-2 border-sky-500 p-3" : ""
          }`}
        >
          Other Leagues
        </p>
        {editIcon ? (
          <img
            src={editIcon}
            alt=""
            className="w-5 h-5 cursor-pointer"
            onClick={handleEdit}
          />
        ) : (
          ""
        )}
      </div>
      {button ? (
        <button
          onClick={handleClick}
          className="w-[169px] h-button bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 font-bold"
        >
          {button}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default PageTitle;
