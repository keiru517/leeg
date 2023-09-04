import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import Select from "../../components/Select";
import ProfileTitle from "../../components/ProfileTitle";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import avatar from "../../assets/img/dark_mode/ronaldo.jpg";
import * as actions from "../../actions";
import ProfileTable from '../../components/Table/Profile';

const Player = () => {
  let { leagueId, playerId } = useParams();

  const options = ["Ascend", "Descend", "Recent"];

  const [value, setValue] = useState("Sort by");

  
  const players = useSelector((state) => state.home.players);
  const player = players.find((player) => player.id == playerId);
  
  const teams = useSelector((state) => state.home.teams);
  const team = teams.find((team) => team.id == player.teamId);

  const league = useSelector(state=> state.home.leagues).find(league=>league.id==league.id);

  const matches = useSelector(state=>state.home.matches);

  return (
    <div className="flex flex-col flex-grow">
      <ProfileTitle
        avatar={avatar}
        team={team}
      >
        <div>
          <div className="flex items-center">
            <p className="text-[28px]">{player.name}</p>
            <span className="text-xs font-normal mt-2 text-font-dark-gray">/ Tornike@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <img src={team.logo} alt="" className="w-6 h-6 rounded-default"/>
            <p className="text-white text-xs font-medium">{team.name} | #{player.jersey_number}</p>
          </div>
        </div>
      </ProfileTitle>

      <p className="font-dark-gray my-[20px]">
        <Link to='/'>
          <span className="underline">My Leagues</span>
        </Link>
        <span className=""> &gt; </span>
        <span className="underline">{league.name}</span>

        <span className=""> &gt; </span>
        <Link to={`/league/${league.id}`}>
          <span className="underline">Teams</span>
        </Link>
        <span className=""> &gt; </span>
        <span className="underline">
          <Link to={`/league/${leagueId}/team/${team.id}`}>
            {team.name}
          </Link>
        </span>
        <span className=""> &gt; </span>
        <span className="text-sky-500">{player.name} </span>
      </p>
      <div className="flex w-full h-[78px] bg-slate rounded-default ">
        <div className="w-1/5 border border-light-gray rounded-l-[10px] flex flex-col justify-center">
          <p className="text-white text-base text-center">Height</p>
          <p className="text-white text-base text-center">{player.height}</p>
        </div>
        <div className="w-1/5 border border-light-gray  flex flex-col justify-center">
          <p className="text-white text-base text-center">Weight</p>
          <p className="text-white text-base text-center">{player.weight}</p>
        </div>
        <div className="w-1/5 border border-light-gray flex flex-col justify-center">
          <p className="text-white text-base text-center">Country</p>
          <p className="text-white text-base text-center">{player.country}</p>
        </div>
        <div className="w-1/5 border border-light-gray flex flex-col justify-center">
          <p className="text-white text-base text-center">Age</p>
          <p className="text-white text-base text-center">{player.age}</p>
        </div>
        <div className="w-1/5 border border-light-gray rounded-r-[10px] flex flex-col justify-center">
          <p className="text-white text-base text-center">Birthdate</p>
          <p className="text-white text-base text-center">{player.birthDate}</p>
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
              matches.length > 0?
              <ProfileTable matches={matches} playerId={playerId} leagueId={leagueId}/>
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
