import React, { useState } from "react";
import { useParams } from "react-router";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "../Select";

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

  const options = [
    { id: 0, name: "All Leagues" },
    { id: 1, name: "My Leagues" },
    { id: 2, name: "Other Leagues" },
  ];
  const [filter, setFilter] = useState("All Leagues");
  const handleFilter = (e) => {
    setFilter(e.name);
    if (e.id === 0) {
      setLeagues(leagues);
    } else if (e.id === 1) {
      const myLeagues = leagues.filter((league) => league.userId == user?.id);
      setLeagues(myLeagues);
    } else if (e.id === 2) {
      const otherLeagues = leagues.filter(
        (league) => league.userId !== user?.id
      );
      setLeagues(otherLeagues);
    }
  };

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
    setLeagues(leagues);
    setTab(0);
  };

  const navigate = useNavigate();

  return (
    <div className="page-title flex items-center justify-between my-3">
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
            className="w-20 h-20 ml-6 rounded-default"
          />
        ) : (
          ""
        )}
        {children ? (
          <p className="text-3xl dark:text-white ml-6 font-bold">{children}</p>
        ) : (
          <>
            <Select
              className="w-[144px] h-[42px] rounded-lg text-xs"
              options={options}
              // handleClick={(e) => setFilter(e.name)}
              handleClick={handleFilter}
              value={filter}
            >
              {filter}
            </Select>
          </>
        )}
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
        <div className="space-x-3">
          {/* <button
            className="w-[169px] h-button bg-lime-600 hover:bg-opacity-70 rounded-default text-white focus:ring-2 font-bold"
          >
            Join by code
          </button> */}
          <button
            onClick={handleClick}
            className="w-[125px] h-button bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 font-bold text-sm"
          >
            {button}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PageTitle;
