import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import search from "../../assets/img/dark_mode/search.png";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import leagueLogo from "../../assets/img/dark_mode/league-logo.png";
import teamLogo from "../../assets/img/dark_mode/team-logo.png";
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
import MatchModal from "../../components/Modal/MatchModal";
import * as actions from "../../actions";
import MatchTable from "../../components/Table/Match";

const League = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == id
  );

  const teams = useSelector((state) => state.home.teams);
  const matches = useSelector((state) => state.home.matches);

  const options = ["Ascend", "Descend", "Recent"];
  const [value, setValue] = useState("Sort by");

  const categories = [
    "Manage Rosters",
    "Teams",
    "Matches",
    "Standings",
    "All Playerlist",
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [breadcrum, setBreadcrum] = useState("Manage Rosters");

  const buttons = {
    "Manage Rosters": "Invite Player",
    Teams: "Create Team",
    Matches: "Create Match",
    Standings: "Create Match",
    "All Playerlist": "Create Match",
  };

  const handleCategory = (data) => {
    setBreadcrum(data);
  };

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

  const getTeams = () => {
    const teams = [
      {
        id: 1,
        league_id: 1,
        logo: teamLogo,
        name: "Real Madrid",
        max: 12,
        min: 3,
        waitlist: 10,
        statistics: {
          w: 12,
          l: 6,
          ps: 167,
          pa: 142,
          diff: 27,
        },
      },
      {
        id: 2,
        league_id: 1,
        logo: teamLogo,
        name: "FC Barcelona",
        max: 12,
        min: 3,
        waitlist: 9,
        statistics: {
          w: 10,
          l: 8,
          ps: 142,
          pa: 127,
          diff: 15,
        },
      },
    ];

    dispatch({ type: actions.GET_TEAMS, payload: teams });
  };

  const getMatches = () => {
    const matches = [
      {
        id: 1,
        league_id: 1,
        date: "Monday, June 19th 2023",
        location: "Etihad Stadium",
        time: "8:00 PM",
        home: "Manchester City",
        home_logo: teamLogo,
        away: "Real Madrid",
        away_logo: teamLogo,
        results: "--",
      },
      {
        id: 2,
        league_id: 1,
        date: "Monday, June 19th 2023",
        location: "Anfield",
        time: "8:00 PM",
        home: "Liverpool",
        home_logo: teamLogo,
        away: "Manchester United",
        away_logo: teamLogo,
        results: "--",
      },
    ];

    dispatch({ type: actions.GET_MATCHES, payload: matches });
  };

  const players = [
    {
      name: "Tornike Shengelia",
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
    },
    {
      name: "Tornike Shengelia",
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
    },
    {
      name: "Tornike Shengelia",
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
    },
    {
      name: "Tornike Shengelia",
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
    },
    {
      name: "Tornike Shengelia",
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
    },
    {
      name: "Tornike Shengelia",
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
    },
    {
      name: "Tornike Shengelia",
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
    },
    {
      name: "Tornike Shengelia",
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
    },
    {
      name: "Tornike Shengelia",
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
    },
    {
      name: "Tornike Shengelia",
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
    },
  ];

  // const players = []

  useEffect(() => {
    getTeams();
    getMatches();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <PageTitle
        backIcon={leftarrowIcon}
        logo={leagueLogo}
        editIcon={editIcon}
        button={buttons[breadcrum]}
        createAction={
          breadcrum == "Manage Rosters"
            ? actions.OPEN_INVITE_PLAYER_DIALOG
            : breadcrum == "Teams"
            ? actions.OPEN_CREATE_TEAM_DIALOG
            : breadcrum == "Matches"
            ? actions.OPEN_CREATE_MATCH_DIALOG
            : ""
        }
      >
        {league.name}
      </PageTitle>
      <p className="font-dark-gray my-[20px]">
        <span className="underline">My Leagues</span>
        <span className="text-sky-500"> &gt; {league.name}</span>
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
                  onClick={() => handleCategory(category)}
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="flex-grow flex items-center ">
              {/* Rosters */}
              <Tab.Panel
                key={0}
                className={classNames(
                  "rounded-xl flex flex-col justify-between w-full h-full"
                )}
              >
                <hr className="h-px my-4 bg-charcoal border-0" />
                <div className="flex items-center h-full space-x-4">
                  <div className="w-1/2 bg-charcoal h-[420px] p-default rounded-main">
                    <div className="flex justify-between w-full">
                      <p className="text-white text-xl font-semibold">
                        Waitlisted Players
                      </p>
                      <p className="text-white text-xl font-semibold">
                        {players.length}
                      </p>
                    </div>
                    <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-dark-gray" />
                    <div className="flex w-full justify-between space-x-10 my-5">
                      <div className="flex flex-grow space-x-3 ">
                        <Input
                          className="flex-grow rounded-lg h-[38px] bg-transparent text-xs"
                          icon={search}
                          placeholder="Search"
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
                      <div>
                        <Button className="text-sm bg-success w-[72px] h-[38px] rounded-lg">
                          Accept
                        </Button>
                      </div>
                    </div>
                    <div
                      className={`overflow-y-scroll h-4/6 flex flex-col items-center flex-grow justify-center ${
                        players.length > 1 ? "" : "bg-dark-gray"
                      } rounded-default`}
                    >
                      {players.length > 1 ? (
                        players.map((player, idx) => (
                          <ListItem
                            key={idx}
                            className="mb-5"
                            avatar={avatar}
                            name={player.name}
                            email={player.email}
                            date={player.created_at}
                          ></ListItem>
                        ))
                      ) : (
                        <p className="text-white font-medium text-sm">
                          No waitlisted Players to show!
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2 bg-charcoal h-[420px] p-default rounded-main">
                    <div className="flex justify-between w-full">
                      <p className="text-white text-xl font-semibold">
                        Accepted Players
                      </p>
                      <p className="text-white text-xl font-semibold">
                        {players.length}
                      </p>
                    </div>
                    <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-dark-gray" />
                    <div className="flex w-full justify-between space-x-10 my-5">
                      <div className="flex flex-grow space-x-3 ">
                        <Input
                          className="flex-grow rounded-lg h-[38px] bg-transparent text-xs"
                          icon={search}
                          placeholder="Search"
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
                      <div>
                        <Button className="text-sm bg-danger w-[72px] h-[38px] rounded-lg">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div
                      className={`overflow-y-scroll h-4/6 flex flex-col items-center flex-grow justify-center space-y-5 ${
                        players.length > 1 ? "" : "bg-dark-gray"
                      } rounded-default`}
                    >
                      {players.length ? (
                        players.map((player, idx) => (
                          <ListItem
                            key={idx}
                            avatar={avatar}
                            name={player.name}
                            email={player.email}
                            date={player.created_at}
                          ></ListItem>
                        ))
                      ) : (
                        <p className="text-white font-medium text-sm">
                          No Accepted Players to show!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <PlayerModal></PlayerModal>
              </Tab.Panel>

              {/* Teams */}
              <Tab.Panel
                key={1}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                {teams.length > 0 ? (
                  <>
                    <hr className="h-px my-4 bg-charcoal border-0" />
                    <Input
                      className="rounded-lg h-[42px] text-xs"
                      icon={search}
                      placeholder="Search Schedules"
                    />
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      {teams.map((team, idx) => (
                        <TeamCard item={team} key={idx}></TeamCard>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Matches to show!
                    </p>
                  </div>
                )}
                <TeamModal />
              </Tab.Panel>

              {/* Matches */}
              <Tab.Panel
                key={2}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                {standings.length > 0 ? (
                  <>
                    <hr className="h-px my-4 bg-charcoal border-0" />
                    <Input
                      className="rounded-lg text-xs"
                      icon={search}
                      placeholder="Search Schedules"
                    />
                    <MatchTable data={matches}></MatchTable>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Matches to show!
                    </p>
                  </div>
                )}
                <MatchModal></MatchModal>
              </Tab.Panel>

              {/*  */}
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
                    <MatchTable data={matches}></MatchTable>
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

export default League;
