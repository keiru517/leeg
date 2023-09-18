import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../../utils/apis";

const Card = (props) => {
  const { route, league } = props;
  const user = useSelector((state) => state.home.user);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const logoUrl = apis.leagueLogoURL(league.userId, league.id);
  //   dispatch({
  //     type: actions.SET_LEAGUE_LOGO_URL,
  //     payload: { id: league.id, logoUrl: logoUrl },
  //   });
  // }, [league.id]);

  const handleApply = () => {
    console.log("HandleApply", user?.id);
    axios
      .post(apis.applyLeague, {
        userId: user?.id,
        leagueId: league?.id,
      })
      .then((res) => {
        alert(res.data.message);
        console.log("userId", user?.id);
        actions.getLeagues(dispatch, user?.id);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  return (
    <Link
      to={`${
        league.isAcceptedList || league.userId == user?.id
          ? `/${route}/${league.id}`
          : ``
      }`}
    >
      {/* <div className={`rounded-default h-[185px] bg-charcoal p-default transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-dark-gray duration-200 ${league.isAcceptedList? "cursor-pointer":""}`}> */}
      <div
        className={`rounded-default h-[185px] bg-charcoal p-default  hover:bg-dark-gray duration-200 ${
          league.isAcceptedList || league.userId == user?.id
            ? "cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1"
            : ""
        }`}
      >
        <div className="">
          <div className="flex items-center">
            <img src={league.logo} className="w-10 h-10 rounded-lg"></img>
            <p className="dark:text-white text-sm ml-5">{league.name}</p>
            {league.userId == user?.id ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 mx-auto">
                  Admin
                </span>
            ) : (
              ""
            )}
          </div>
          {/* <div className='flex items-center'>
                    <img src={rightarrow}></img>
                </div> */}
        </div>
        <div className="h-[75px] mt-4">
          <p className="dark:text-font-dark-gray text-[10px] text-left">
            Start Date: {league.startDate} End Date: {league.endDate}
          </p>
          <p className="dark: text-[#c6c6c6] text-left text-xs h-[54px] mt-2">
            {league.description}
          </p>
        </div>
        <div className="text-right">
          {league.isWaitList ? (
            <p className="dark:text-yellow-500 text-xs cursor-pointer">
              PENDING
            </p>
          ) : league.isAcceptedList ? (
            <p className="dark:text-green-500 text-xs cursor-pointer">
              ACCEPTED
            </p>
          ) : (
            <p
              onClick={handleApply}
              className="dark:text-blue-500 text-xs cursor-pointer hover:text-green-500"
            >
              APPLY
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
