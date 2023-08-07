import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import search from "../../assets/img/dark_mode/search.png";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
// import logo from "../../assets/img/dark_mode/league-logo.png";
import editIcon from "../../assets/img/dark_mode/edit.png";
import deleteIcon from "../../assets/img/dark_mode/delete.png";
// import delete from '../../assets/img/delete.png';
import Input from "../../components/Input";
import ListItem from "../../components/ListItem";
import Select from "../../components/Select";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import TeamCard from "../../components/Card/Team";
import { Tab } from "@headlessui/react";
import avatar from "../../assets/img/dark_mode/player.png";
import LeagueModal from "../../components/Modal/LeagueModal";
import PlayerModal from "../../components/Modal/PlayerModal";
import TeamModal from "../../components/Modal/TeamModal";
import * as actions from "../../actions";
import MatchTable from "../../components/Table/Match";
import TeamStatisticsTable from "../../components/Table/TeamStatistics";
import PlayerStatisticsTable from "../../components/Table/PlayerStatistics";
import TeamTable from '../../components/Table/Team';

const Team = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == id
  );

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == team.league_id
  );

  console.log(team, league);

  const teams = useSelector((state) => state.home.teams);

  const options = ["Ascend", "Descend", "Recent"];
  const [value, setValue] = useState("Sort by");

  const categories = ["Matches", "Statistics", "Players"];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const standings = [
    { team: "Bucks", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    { team: "FC inter", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    { team: "AC Milan", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    { team: "Juventus", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    { team: "Real madrid", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    { team: "FC Barcelona", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    {
      team: "Rayo Vallecano",
      w: 12,
      l: 6,
      scored: 167,
      against: 142,
      diff: 27,
    },
    { team: "Fenerbahche", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    { team: "Fenerbahche", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    { team: "Fenerbahche", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    { team: "Fenerbahche", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    { team: "Fenerbahche", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
    { team: "Fenerbahche", w: 12, l: 6, scored: 167, against: 142, diff: 27 },
  ];


  const matches = [
    {
      id: 1,
      date: "Thursday, July, 2023",
      location: "New York",
      time: "8:00 PM",
      home: "Real Madrid",
      away: "FC Barcelona",
      results: "41-74",
    },
    {
      id: 2,
      date: "Friday, August, 2023",
      location: "TABC New gym",
      time: "3:00 PM",
      home: "Juventus",
      away: "Real Madrid",
      results: "71-62",
    },
    {
      id: 3,
      date: "Saturday, July, 2023",
      location: "4 Peace",
      time: "10:00 AM",
      home: "Liverpool",
      away: "Real Madrid",
      results: "51-42",
    },
  ];

  // const getPlayers = () => {
  const players_statistics = [
    {
      id: 1,
      league_id: 1,
      team_id: 1,
      name: "George Anderson",
      number: 0,
      points: 167,
      ppg: 142,
      gp: 27,
    },
    {
      id: 1,
      league_id: 1,
      team_id: 1,
      name: "George Anderson",
      number: 0,
      points: 167,
      ppg: 142,
      gp: 27,
    },
    {
      id: 1,
      league_id: 1,
      team_id: 1,
      name: "George Anderson",
      number: 0,
      points: 167,
      ppg: 142,
      gp: 27,
    },
  ];

  const players = [
    {
      id: 1,
      logo: avatar,
      name: "Christiano Ronaldo",
    },
    {
      id: 2,
      logo: avatar,
      name: "Lionel Messi",
    },
    {
      id: 3,
      logo: avatar,
      name: "Karim Benzema",
    },
    {
      id: 4,
      logo: avatar,
      name: "Kiran Mbappe",
    },
    {
      id: 5,
      logo: avatar,
      name: "Erling Holand",
    },
    {
      id: 6,
      logo: avatar,
      name: "Sabi Alonso",
    },
  ];
  // }
  // dispatch({type:actions.GET_PLAYERS})

  // useEffect(()=>{
  //   getPlayers();
  // }, [])
  return (
    <div className="flex flex-col flex-grow">
      <PageTitle backIcon={leftarrowIcon} logo={team.logo}>
        {team.name}
      </PageTitle>
      <p className="font-dark-gray my-[20px]">
        <span className="underline">My Leagues</span>
        <span className="text-sky-500"> &gt; </span>
        <span className="underline">{league.name}</span>
        <span className="text-sky-500"> &gt; </span>
        <span className="underline">Teams</span>
        <span className="text-sky-500"> &gt; {team.name}</span>
      </p>
      <div className="rounded-main bg-slate flex-grow p-default">
        <div className="w-full px-2 sm:px-0 h-full flex flex-col">
          <Tab.Group>
            <Tab.List className="flex justify-start space-x-5 rounded-xl bg-transparent p-1 ">
              {categories.map((category, idx) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "py-2.5 text-sm font-medium leading-5 text-gray-300 px-3",
                      " focus:outline-none ",
                      selected
                        ? "divide-[bg-sky-500] text-white border-b-2 border-sky-500"
                        : " rounded-lg hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                  // onClick={() => handleCategory(category)}
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="flex-grow flex items-center ">
              {/* Matches */}
              <Tab.Panel
                key={0}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                <hr className="h-px my-4 bg-charcoal border-0" />
                <div className="search flex justify-between space-x-3">
                  <Input
                    icon={search}
                    className="flex-grow rounded-lg text-xs h-[42px]"
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
                {matches.length > 0 ? (
                  <>
                    <MatchTable
                      data={matches}
                    ></MatchTable>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Matches To Show!
                    </p>
                  </div>
                )}
              </Tab.Panel>

              {/* Statitics */}
              <Tab.Panel
                key={1}
                className={classNames(
                  "rounded-xl flex flex-col w-full h-full "
                )}
              >
                {matches.length > 0 ? (
                  <>
                    <hr className="h-px my-4 bg-charcoal border-0" />
                    <div className=" flex flex-col space-y-5">
                      <p className="text-white text-sm font-mediim">
                        Team Statistics
                      </p>
                      <TeamStatisticsTable
                        data={team.statistics}
                      ></TeamStatisticsTable>
                      <p className="text-white text-sm font-mediim">
                        Player Statistics
                      </p>
                      <Input
                        className="rounded-lg"
                        icon={search}
                        placeholder="Search Schedules"
                      />
                      <PlayerStatisticsTable
                        data={players_statistics}
                      ></PlayerStatisticsTable>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Statistics To Show!
                    </p>
                  </div>
                )}
              </Tab.Panel>
              {/* Players */}
              <Tab.Panel
                key={2}
                className={classNames(
                  "rounded-xl flex flex-col w-full h-full "
                )}
              >
                {matches.length > 0 ? (
                  <>
                    <hr className="h-px my-4 bg-charcoal border-0" />
                    <div className=" flex flex-col space-y-5">
                      <Input
                        className="rounded-lg"
                        icon={search}
                        placeholder="Search Schedules"
                      />
                      <div className="flex flex-grow items-center">
                        <TeamTable data={players}></TeamTable>:
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Statistics To Show!
                    </p>
                  </div>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <LeagueModal />
    </div>
  );
};

export default Team;
