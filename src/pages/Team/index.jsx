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
import Table from '../../components/Table';
import MatchTable from '../../components/Table/Match';

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

  const categories = ["Matches", "Statistics"];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // const [breadcrum, setBreadcrum] = useState("Manage Rosters");

  // const buttons = {
  //   "Matches": " ",
  //   Teams: "Create Team",
  //   Matches: "Create Match",
  //   Standings: "Create Match",
  //   "All Playerlist": "Create Match",
  // };

  // const handleCategory = (data) => {
  //   setBreadcrum(data);
  // };

  // const schedules = [];

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

  // const players = [
  //   {
  //     name: "Tornike Shengelia",
  //     email: "James@gmail.com",
  //     created_at: "June 26, 2023, 10:00PM",
  //   },
  //   {
  //     name: "Tornike Shengelia",
  //     email: "James@gmail.com",
  //     created_at: "June 26, 2023, 10:00PM",
  //   },
  //   {
  //     name: "Tornike Shengelia",
  //     email: "James@gmail.com",
  //     created_at: "June 26, 2023, 10:00PM",
  //   },
  //   {
  //     name: "Tornike Shengelia",
  //     email: "James@gmail.com",
  //     created_at: "June 26, 2023, 10:00PM",
  //   },
  //   {
  //     name: "Tornike Shengelia",
  //     email: "James@gmail.com",
  //     created_at: "June 26, 2023, 10:00PM",
  //   },
  //   {
  //     name: "Tornike Shengelia",
  //     email: "James@gmail.com",
  //     created_at: "June 26, 2023, 10:00PM",
  //   },
  //   {
  //     name: "Tornike Shengelia",
  //     email: "James@gmail.com",
  //     created_at: "June 26, 2023, 10:00PM",
  //   },
  //   {
  //     name: "Tornike Shengelia",
  //     email: "James@gmail.com",
  //     created_at: "June 26, 2023, 10:00PM",
  //   },
  //   {
  //     name: "Tornike Shengelia",
  //     email: "James@gmail.com",
  //     created_at: "June 26, 2023, 10:00PM",
  //   },
  //   {
  //     name: "Tornike Shengelia",
  //     email: "James@gmail.com",
  //     created_at: "June 26, 2023, 10:00PM",
  //   },
  // ];

  // const matches = ['a'];

  const columns = [
    "Date",
    "Location",
    "Time",
    "Home",
    "Away",     
    "Results",
    "Action",
  ];
  
  const matches = [
    {id:1, 'date': '123', 'location': 'New york', 'time': '8:00', 'home': 'real', 'away': 'bacel', 'results':'41-62'},
    {id:1, 'date': '123', 'location': 'New york', 'time': '8:00', 'home': 'real', 'away': 'bacel', 'results':'41-62'},
    {id:1, 'date': '123', 'location': 'New york', 'time': '8:00', 'home': 'real', 'away': 'bacel', 'results':'41-62'},
  ];

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
                    className="flex-grow rounded-lg"
                    placeholder="Search Leagues"
                  />
                  <Select
                    className="w-[144px] rounded-lg"
                    options={options}
                    handleClick={(e) => setValue(e)}
                    value={value}
                  >
                    {value}
                  </Select>
                </div>
                {matches.length > 0 ? (
                  <>
                   {/* <StandingsTable columns={columns} data={data}></StandingsTable> */}
                   <MatchTable columns={columns} matches={matches}></MatchTable>
                   {/* <Table columns={columns} data={data}></Table> */}
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Standings to show!
                    </p>
                  </div>
                )}
                {/* <IndexTable></IndexTable>
                <StandingsTable columns={standing_columns} data={standings} /> */}
              </Tab.Panel>

              {/* Teams */}
              <Tab.Panel
                key={3}
                className={classNames(
                  "rounded-xl flex flex-col justify-between w-full h-full"
                )}
              >
                {matches.length > 0 ? (
                  <>
                    <hr className="h-px my-4 bg-charcoal border-0" />
                    <Input
                      className="rounded-lg"
                      icon={search}
                      placeholder="Search Schedules"
                    />
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Teams to show!
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
