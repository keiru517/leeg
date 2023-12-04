import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../../utils/apis";
import league_logo from "../../assets/img/dark_mode/league-logo.png";

const Card = (props) => {
  const { route, league } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.home.user);
  const admins = useSelector((state) => state.home.admins).filter(
    (admin) => admin.leagueId == league.id && admin.isDeleted !== 1
  );

  const users = useSelector((state) => state.home.users);
  const owner = users.find((user) => user.id == league.userId);

  const isAdmin =
    admins.some((admin) => admin.userId == user?.id) ||
    league.userId == user?.id;

  const player = useSelector((state) => state.home.players).find(
    (player) => player.userId == user?.id && player.leagueId == league.id
  );

  const handleApply = (e) => {
    e.stopPropagation();
    console.log("HandleApply", user?.id, league.id);
    axios
      .post(apis.applyLeague, {
        userId: user?.id,
        leagueId: league?.id,
      })
      .then((res) => {
        alert(res.data.message);
        // console.log("userId", user?.id);
        actions.getPlayers(dispatch);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div
      className={`rounded-default h-[185px] bg-light-charcoal dark:bg-charcoal p-default hover:bg-light-dark-gray dark:hover:bg-dark-gray duration-200 shadow dark:shadow-gray-600 ${
        isAdmin ||
        league?.userId == user?.id ||
        player?.isAcceptedList === 1 ||
        league?.isAllowedFan
          ? "cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1"
          : ""
      }`}
      onClick={() => {
        if (
          league?.userId == user?.id ||
          isAdmin ||
          player?.isAcceptedList === 1 ||
          league?.isAllowedFan
        ) {
          navigate(`/${route}/${league.id}`);
        }
      }}
    >
      <div className="">
        <div className="items-center justify-between">
          <div className="flex items-center">
            <img src={league.logo} className="w-10 h-10 rounded-lg"></img>
            <p className="dark:text-white text-sm ml-5 truncate max-w-full">
              {league.name} / {league.id.toString().padStart(6, "0")}
              <br></br>
              <span className="text-xs text-gray-400"> {owner?.email}</span>
            </p>
          </div>
        </div>
        {/* <div className='flex items-center'>
                    <img src={rightarrow}></img>
                </div> */}
      </div>
      <div className="h-[75px] mt-4">
        <p className="dark:text-gray-400 text-[10px] text-left">
          Start Date: {league.startDate} End Date: {league.endDate}
        </p>
        <p className="dark:text-[#c6c6c6] text-left text-xs h-[54px] mt-2 truncate max-w-full">
          {league.description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          {player?.isAcceptedList === 1 &&
          player?.isDeleted !== 1 &&
          player?.teamId !== 0 ? (
            <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
              Player
            </span>
          ) : (
            ""
          )}
          {/* {league.userId == user?.id ? ( */}
          {isAdmin ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              Admin
            </span>
          ) : (
            ""
          )}
          {league?.isAllowedFan ? (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
              Public
            </span>
          ) : (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
              Private
            </span>
          )}
        </div>
        <div className="flex justify-end">
          {player?.isWaitList === 1 ? (
            <p className="dark:text-yellow-500 text-xs cursor-pointer">
              PENDING
            </p>
          ) : player?.isAcceptedList === 1 ? (
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
    </div>
  );
};

export default Card;
