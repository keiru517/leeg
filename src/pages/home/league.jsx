import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import search from "../../assets/img/dark_mode/search.png";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import editIcon from "../../assets/img/dark_mode/edit.png";
import Input from "../../components/Input";
import ListItem from "../../components/ListItem";
import Select from "../../components/Select";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import TeamCard from "../../components/Card/Team";
import { Tab } from "@headlessui/react";
import avatar from "../../assets/img/dark_mode/player.png";
import LeagueModal from "../../components/Modal/LeagueModal";
import PlayerModal from "../../components/Modal/PlayerModal";
import TeamModal from "../../components/Modal/TeamModal";
import MatchModal from "../../components/Modal/MatchModal";
import MatchTable from "../../components/Table/Match";
import StandingTable from "../../components/Table/Standing";
import PlayerTable from "../../components/Table/Player";
import apis from "../../utils/apis";
import * as actions from "../../actions";

const League = () => {
  let { leagueId } = useParams();
  const dispatch = useDispatch();

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const teams = useSelector((state) => state.home.teams).filter(
    (team) => team.leagueId == leagueId
  );
  const matches = useSelector((state) => state.home.matches).filter(
    (match) => match.leagueId == leagueId
  );

  const tabIndex = useSelector((state) => state.home.tab);

  const options = [
    { id: 0, name: "Ascend" },
    { id: 1, name: "Descend" },
    { id: 2, name: "Recent" },
  ];

  const [value, setValue] = useState("Sort by");
  const [waitSortValue, setWaitSortValue] = useState("Sort by");
  const [acceptSortValue, setAcceptSortValue] = useState("Sort by");

  const categories = [
    "Manage Rosters",
    "Teams",
    "Schedule",
    "Standings",
    "All Playerlist",
    "Settings",
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [breadcrum, setBreadcrum] = useState(0);
  const [waitItemChecked, setWaitItemChecked] = useState({});
  const [acceptedItemChecked, setAcceptedItemChecked] = useState({});

  const buttons = [
    "Invite Player",
    "Create Team",
    "Create Match",
    "Create Match",
    "Create Match",
  ];
  // const buttons = {
  //   "Manage Rosters": "Invite Player",
  //   "Teams": "Create Team",
  //   "Schedule": "Create Match",
  //   "Standings": "Create Match",
  //   "All Playerlist": "Create Match",
  // };

  const handleCategory = (data) => {
    console.log(data);
    dispatch({ type: actions.SET_TAB_ID, payload: data });
    setBreadcrum(data);
  };
  const players = useSelector((state) => state.home.players);

  const waitListPlayers = players.filter(
    (player) => (player.leagueId == leagueId) & (player.role == 0)
  );

  const acceptedPlayers = players.filter(
    (player) => (player.leagueId == leagueId) & (player.role == 1)
  );

  useEffect(() => {
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getMatchups(dispatch);
    actions.getPlayers(dispatch);
  }, []);

  const [waitKeyword, setWaitKeyword] = useState("");

  const setWaitListItemChecked = (index, checked) => {
    let temp = { ...waitItemChecked };
    temp[index] = checked;
    setWaitItemChecked(temp);
  };
  const setAcceptedListItemChecked = (index, checked) => {
    acceptedItemChecked[index] = checked;
    setAcceptedItemChecked({ ...acceptedItemChecked });
  };

  const handleAccept = () => {
    if (Object.keys(waitItemChecked).length < 1) {
      alert("Please select at least one player!");
    } else {
      axios
        .post(apis.acceptPlayer, waitItemChecked)
        .then((res) => {
          actions.getPlayers(dispatch);
          setWaitItemChecked({});
        })
        .catch((error) => alert(error.data.message));
    }
  };

  const handleRemove = () => {
    if (Object.keys(acceptedItemChecked).length < 1) {
      alert("Please select at least one player!");
    } else {
      axios
        .post(apis.unacceptPlayer, acceptedItemChecked)
        .then((res) => {
          actions.getPlayers(dispatch);
          setAcceptedItemChecked({});
        })
        .catch((error) => alert(error.data.message));
    }
  };

  const handleInvitePlayer = () => {
    dispatch({ type: actions.OPEN_INVITE_PLAYER_DIALOG, payload: true });
  };
  const handleCreateTeam = () => {
    dispatch({ type: actions.OPEN_CREATE_TEAM_DIALOG, payload: true });
  };
  const handleCreateMatch = () => {
    dispatch({ type: actions.OPEN_CREATE_MATCH_DIALOG, payload: true });
  };

  return (
    <div className="flex flex-col flex-grow">
      {/* <PageTitle
        backIcon={leftarrowIcon}
        logo={league.logo}
        editIcon={editIcon}
      >
        {league.name}
      </PageTitle> */}
      <p className="font-dark-gray my-[20px]">
        <Link to="/">
          <span className="underline">My Leagues</span>
        </Link>
        <span className="text-sky-500"> &gt; {league.name}</span>
      </p>

      <div className="rounded-main bg-slate flex-grow p-default">
        <div className="w-full px-2 sm:px-0 h-full flex flex-col">
          <Tab.Group defaultIndex={tabIndex}>
            <div className="flex justify-between">
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
                    onClick={() => handleCategory(idx)}
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              {breadcrum == 0 ? (
                <button
                  onClick={handleInvitePlayer}
                  className="w-36 h-[42px] bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold"
                >
                  Invite Player
                </button>
              ) : breadcrum == 1 ? (
                <button
                  onClick={handleCreateTeam}
                  className="w-36 h-[42px] bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold"
                >
                  Create Team
                </button>
              ) : breadcrum == 2 ? (
                <button
                  onClick={handleCreateMatch}
                  className="w-36 h-[42px] bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold"
                >
                  Create Match
                </button>
              ) : (
                ""
              )}
            </div>
            <Tab.Panels className="flex-grow flex items-center ">
              {/* Rosters */}
              <Tab.Panel
                key={0}
                className={classNames(
                  "rounded-xl flex flex-col justify-between w-full h-full"
                )}
              >
                <hr className="h-px my-4 bg-charcoal border-0" />
                <div className="flex h-full space-x-4">
                  <div className="w-1/2 bg-charcoal flex flex-col h-full min-h-[420px] p-default rounded-main">
                    <div className="flex justify-between w-full">
                      <p className="text-white text-xl font-semibold">
                        Waitlisted Players
                      </p>
                      <p className="text-white text-xl font-semibold">
                        {waitListPlayers.length}
                      </p>
                    </div>
                    <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-dark-gray" />
                    <div className="flex w-full justify-between space-x-10 my-5">
                      <div className="flex flex-grow space-x-3 ">
                        <Input
                          className="flex-grow rounded-lg h-[38px] dark:bg-charcoal bg-white text-xs"
                          icon={search}
                          placeholder="Search"
                          value={waitKeyword}
                          onChange={(e) => {
                            setWaitKeyword(e.target.value);
                          }}
                        />
                        <Select
                          className="w-[144px] rounded-lg text-xs"
                          options={options}
                          handleClick={(e) => setWaitSortValue(e.name)}
                          value={waitSortValue}
                        >
                          {waitSortValue}
                        </Select>
                      </div>
                      <div>
                        <Button
                          onClick={handleAccept}
                          className="text-sm bg-success w-[72px] h-[38px] rounded-lg hover:opacity-70"
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                    <div
                      className={`overflow-y-scroll h-4/6 flex flex-col items-center flex-grow ${
                        waitListPlayers.length
                          ? ""
                          : "dark:bg-light-gray justify-center"
                      } rounded-default`}
                    >
                      {waitListPlayers.length ? (
                        waitListPlayers.map((player, idx) => (
                          <ListItem
                            key={idx}
                            className="mb-5"
                            avatar={avatar}
                            name={player.name}
                            email={player.email}
                            date={player.createdAt}
                            itemChecked={!!waitItemChecked[player.id]}
                            setItemChecked={(checked) => {
                              setWaitListItemChecked(player.id, checked);
                            }}
                          ></ListItem>
                        ))
                      ) : (
                        <p className="text-white font-medium text-sm">
                          No waitlisted Players to show!
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2 bg-charcoal flex flex-col h-full min-h-[420px] p-default rounded-main">
                    <div className="flex justify-between w-full">
                      <p className="text-white text-xl font-semibold">
                        Accepted Players
                      </p>
                      <p className="text-white text-xl font-semibold">
                        {acceptedPlayers.length}
                      </p>
                    </div>
                    <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-dark-gray" />
                    <div className="flex w-full justify-between space-x-10 my-5">
                      <div className="flex flex-grow space-x-3 ">
                        <Input
                          className="flex-grow rounded-lg h-[38px] dark:bg-charcoal bg-white text-xs"
                          icon={search}
                          placeholder="Search"
                        />
                        <Select
                          className="w-[144px] rounded-lg text-xs"
                          options={options}
                          handleClick={(e) => setAcceptSortValue(e.name)}
                          value={acceptSortValue}
                        >
                          {acceptSortValue}
                        </Select>
                      </div>
                      <div>
                        <Button
                          onClick={handleRemove}
                          className="text-sm bg-danger w-[72px] h-[38px] rounded-lg hover:opacity-70"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div
                      className={`overflow-y-scroll h-4/6 flex flex-col items-center flex-grow space-y-5 ${
                        acceptedPlayers.length
                          ? ""
                          : "dark:bg-light-gray justify-center"
                      } rounded-default`}
                    >
                      {acceptedPlayers.length ? (
                        acceptedPlayers.map((player, idx) => (
                          <ListItem
                            key={idx}
                            avatar={avatar}
                            name={player.name}
                            email={player.email}
                            date={player.created_at}
                            itemChecked={!!acceptedItemChecked[player.id]}
                            setItemChecked={(checked) => {
                              setAcceptedListItemChecked(player.id, checked);
                            }}
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
                        <TeamCard team={team} key={idx}></TeamCard>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Teams to show!
                    </p>
                  </div>
                )}
                <TeamModal />
              </Tab.Panel>

              {/* Schedule */}
              <Tab.Panel
                key={2}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                {matches.length > 0 ? (
                  <>
                    <hr className="h-px my-4 bg-charcoal border-0" />
                    <Input
                      className="rounded-lg text-xs"
                      icon={search}
                      placeholder="Search Schedules"
                    />
                    <MatchTable
                      matches={matches}
                      leagueId={leagueId}
                    ></MatchTable>
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

              {/* Standings */}
              <Tab.Panel
                key={3}
                className={classNames(
                  "rounded-xl flex flex-col justify-between w-full h-full"
                )}
              >
                {teams.length > 0 ? (
                  <>
                    <hr className="h-px my-4 bg-charcoal border-0" />
                    <div className="flex space-x-3">
                      <Input
                        className="rounded-lg flex-grow text-xs"
                        icon={search}
                        placeholder="Search Standings"
                      />
                      <Select
                        className="text-xs"
                        options={options}
                        handleClick={(e) => setValue(e.name)}
                        value={value}
                      >
                        {value}
                      </Select>
                    </div>
                    <StandingTable teams={teams}></StandingTable>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Standings to show!
                    </p>
                  </div>
                )}
              </Tab.Panel>

              {/* All Playerlist */}
              <Tab.Panel
                key={4}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                {teams.length > 0 ? (
                  <>
                    <hr className="h-px my-4 bg-charcoal border-0" />
                    <div className="flex space-x-3">
                      <Input
                        className="rounded-lg flex-grow text-xs"
                        icon={search}
                        placeholder="Search Standings"
                      />
                      <Select
                        className="text-xs"
                        options={options}
                        handleClick={(e) => setValue(e.name)}
                        value={value}
                      >
                        {value}
                      </Select>
                    </div>
                    <PlayerTable teams={teams}></PlayerTable>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Players To Show!
                    </p>
                  </div>
                )}
              </Tab.Panel>

              {/* Settings */}
              <Tab.Panel
                key={5}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                {teams.length > 0 ? (
                  <>
                    <hr className="h-px my-4 bg-charcoal border-0" />
                    <div className="flex space-x-3">
                      <Input
                        className="rounded-lg flex-grow text-xs"
                        icon={search}
                        placeholder="Search Standings"
                      />
                      <Select
                        className="text-xs"
                        options={options}
                        handleClick={(e) => setValue(e.name)}
                        value={value}
                      >
                        {value}
                      </Select>
                    </div>
                    <h1 className="dark:text-white font-bold text-2xl">
                      Settings page
                    </h1>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No Players To Show!
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
