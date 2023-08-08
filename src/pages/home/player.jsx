import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import Select from "../../components/Select";
import ProfileTitle from "../../components/ProfileTitle";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import avatar from "../../assets/img/dark_mode/ronaldo.jpg";
import * as actions from "../../actions";
import ProfileTable from '../../components/Table/Profile';

const Player = () => {
  let { id } = useParams();

  const options = ["Ascend", "Descend", "Recent"];

  const [value, setValue] = useState("Sort by");

  const teams = useSelector((state) => state.home.teams);
  const players = useSelector((state) => state.home.players);

  const player = players.find((player) => player.id == id);
  const statistics = player.statistics;

  return (
    <div className="flex flex-col flex-grow">
      <ProfileTitle
        createAction={actions.OPEN_CREATE_LEAGUE_DIALOG}
        backIcon={leftarrowIcon}
        avatar={avatar}
      >
        <div>
          <p className="text-[32px]">{player.name}</p>
          <span className="text-xs font-normal">Tornike@gmail.com</span>
        </div>
      </ProfileTitle>

      <p className="font-dark-gray my-[20px]">
        <span className="underline">My Leagues</span>
        <span className=""> &gt; </span>
        <span className="underline">LEague</span>

        <span className=""> &gt; </span>
        <span className="underline">Teams</span>
        <span className=""> &gt; </span>
        <span className="underline">
          {teams.find((team) => team.id == player.team_id).name}
        </span>
        <span className=""> &gt; </span>
        <span className="text-sky-500">{player.name} </span>
      </p>
      <div className="flex w-full h-[78px] bg-slate rounded-default ">
        <div className="w-1/5 border border-light-gray rounded-l-[10px] flex flex-col justify-center">
          <p className="text-white text-base text-center">Height</p>
          <p className="text-white text-base text-center">6"9"(2.06m)</p>
        </div>
        <div className="w-1/5 border border-light-gray  flex flex-col justify-center">
          <p className="text-white text-base text-center">Weight</p>
          <p className="text-white text-base text-center">255lb (116kg)</p>
        </div>
        <div className="w-1/5 border border-light-gray flex flex-col justify-center">
          <p className="text-white text-base text-center">Country</p>
          <p className="text-white text-base text-center">Georgia</p>
        </div>
        <div className="w-1/5 border border-light-gray flex flex-col justify-center">
          <p className="text-white text-base text-center">Age</p>
          <p className="text-white text-base text-center">25 Years</p>
        </div>
        <div className="w-1/5 border border-light-gray rounded-r-[10px] flex flex-col justify-center">
          <p className="text-white text-base text-center">Birthdate</p>
          <p className="text-white text-base text-center">July 18, 1977</p>
        </div>
      </div>

      <div className="flex flex-col flex-grow rounded-main bg-slate overflow-auto mt-5 p-default">
        <div className="search flex justify-between space-x-6">
          <Select
            className="w-full rounded-lg text-xs h-[42px]"
            options={options}
            handleClick={(e) => setValue(e)}
            value={value}
          >
            {value}
          </Select>
        </div>
            {
              statistics.length < 0?
              <ProfileTable data={statistics}/>
              :
              <div className="flex flex-grow items-center ">
                <p className="text-2xl text-white font-bold w-full text-center">No Statistics To Show!</p>
              </div>

            }
      </div>
    </div>
  );
};

export default Player;
