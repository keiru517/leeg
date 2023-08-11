import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import MatchCard from "../../components/Card/Match";
import search from "../../assets/img/dark_mode/search.png";
import Input from "../../components/Input";
import Select from "../../components/Select";
import PageTitle from "../../components/PageTitle";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import * as actions from "../../actions";
import SubstituteModal from "../../components/Modal/SubstituteModal";

const Matchup = () => {
  let {  match_id } = useParams();

  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id === match_id
  );

  const home_team = useSelector(state=>state.home.teams).find(team=>team.id === match.home_team_id);
  const away_team = useSelector(state=>state.home.teams).find(team=>team.id === match.away_team_id);

  const options = ["Ascend", "Descend", "Recent"];
  const [value, setValue] = useState("Sort by");


  useEffect(() => {
    // getLeagues();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <PageTitle
        backIcon={leftarrowIcon}
        createAction={actions.OPEN_CREATE_LEAGUE_DIALOG}
        button="Mark as Finished"
      >
        Matchup Page
      </PageTitle>
      <p className="font-dark-gray my-[20px]">
        <Link to="/">
          <span className="underline">My Leagues</span>
        </Link>
        <span className=""> &gt; </span>
        <span className="underline">2023 Summer League</span>

        <span className=""> &gt; </span>
        <Link>
          <span className="underline">Matches</span>
        </Link>
        <span className=""> &gt; </span>
        <span className="text-sky-500">
          {/* <Link to={`/league/${league_id}/team/${team.id}`}> */}
          {home_team.name} Vs {away_team.name}
          {/* </Link> */}
        </span>
      </p>
      <div className="flex rounded-main bg-slate p-12 h-[284px] items-center justify-center">
        <div className="flex space-x-10">
          <div className="text-center w-[330px]">
            <img
              src={home_team.logo}
              alt=""
              className="w-28 h-28 rounded-full mx-auto"
            />
            <p className="text-white font-semibold text-2xl mt-5">{home_team.name}</p>
            <p className="text-font-dark-gray font-semibold text-xl">Home</p>
          </div>
          <div className="text-center mt-3">
            <p className="text-white text-sm mt-3">{match.status}</p>
            <p className="text-white text-[56px] my-2">{match.result}</p>
            <p className="text-white text-sm">{match.date}</p>
            <p className="text-font-dark-gray text-sm mt-1">{match.location}</p>
          </div>
          <div className="text-center w-[330px]">
            <img
              src={away_team.logo}
              alt=""
              className="w-28 h-28 rounded-full mx-auto"
            />
            <p className="text-white font-semibold text-2xl mt-5">{away_team.name}</p>
            <p className="text-font-dark-gray font-semibold text-xl">Away</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow rounded-main bg-slate overflow-auto mt-[20px] p-default">
        <div className="search flex justify-between space-x-3">
          <Input
            icon={search}
            className="flex-grow rounded-lg text-xs"
            placeholder="Search Leagues"
          />
          <Select
            className="w-[144px] rounded-lg text-xs"
            options={options}
            handleClick={(e) => setValue(e)}
            value={value}
          >
            {value}
          </Select>
        </div>
        <br></br>
        <div className="grid grid-cols-2 gap-4">
          <MatchCard team_id={home_team.id}></MatchCard>
          <MatchCard team_id={away_team.id}></MatchCard>
        </div>
        {/* {leagues.length ? (
        ) : (
          <div className="dark:text-white text-2xl flex items-center flex-grow justify-center">
            <p>No Leagues to show!</p>
          </div>
        )}{" "} */}
      </div>
      <SubstituteModal />
    </div>
    // </div>
  );
};

export default Matchup;