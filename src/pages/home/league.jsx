import React, { useState, useEffect, useRef } from "react";
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
import calendar from "../../assets/img/dark_mode/calendar.png";
import apis from "../../utils/apis";
import * as actions from "../../actions";

const League = () => {
  let { leagueId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.home.user);
  const tab = useSelector((state) => state.home.tab);

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const [leagueName, setLeagueName] = useState();
  const [leagueDescription, setLeagueDescription] = useState();
  const [leagueStartDate, setLeagueStartDate] = useState();
  const [leagueEndDate, setLeagueEndDate] = useState();

  const teams = useSelector((state) => state.home.teams).filter(
    (team) => team.leagueId == leagueId && team.isDeleted !== 1
  );
  const players = useSelector((state) => state.home.players).filter(
    (player) => player.leagueId == leagueId && player.isDeleted !== 1
  );
  const matches = useSelector((state) => state.home.matches).filter(
    (match) => match.leagueId == leagueId
  );

  const options = [
    { id: 0, name: "Ascend" },
    { id: 1, name: "Descend" },
    { id: 2, name: "Recent" },
  ];

  const [value, setValue] = useState("Sort by");
  const [waitSortValue, setWaitSortValue] = useState("Sort by");
  const [acceptSortValue, setAcceptSortValue] = useState("Sort by");
  var categories = [];
  if (league?.userId == user?.id) {
    categories = [
      "Manage Rosters",
      "Teams",
      "Schedule",
      "Standings",
      "All Playerlist",
      "Settings",
    ];
  } else {
    categories = [
      // "Manage Rosters",
      "Teams",
      "Schedule",
      "Standings",
      "All Playerlist",
    ];
  }

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
    dispatch({ type: actions.SET_TAB_ID, payload: data });
    setBreadcrum(data);
    setWaitListKeyword("");
    setAcceptListKeyword("");
    setTeamKeyword("");
    setScheduleKeyword("");
    setStandingsKeyword("");
    setPlayerKeyword("");
  };

  const waitListPlayers = players.filter(
    (player) =>
      player.isWaitList == true &&
      player.leagueId == leagueId &&
      player.teamId === 0
  );

  const acceptedPlayers = players.filter(
    (player) =>
      player.isAcceptedList == true &&
      player.leagueId == leagueId &&
      player.teamId === 0
  );

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getCountries(dispatch);
    actions.getLeagues(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getMatchups(dispatch);
    actions.getPlayers(dispatch);
  }, []);

  useEffect(() => {
    setLeagueName(league?.name);
    setLeagueDescription(league?.description);
    setLeagueStartDate(league?.startDate);
    setLeagueEndDate(league?.endDate);
  }, [league]);

  // Search section
  const [waitListKeyword, setWaitListKeyword] = useState("");
  const [filteredWaitListPlayers, setFilteredWaitListPlayers] = useState([]);

  const [acceptListKeyword, setAcceptListKeyword] = useState("");
  const [filteredAcceptListPlayers, setFilteredAcceptListPlayers] = useState(
    []
  );

  const [teamKeyword, setTeamKeyword] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);

  const [scheduleKeyword, setScheduleKeyword] = useState("");
  const [filteredMatches, setFilteredMatches] = useState([]);

  const [standingsKeyword, setStandingsKeyword] = useState("");
  const [filteredStandings, setFilteredStandings] = useState([]);

  const [playerKeyword, setPlayerKeyword] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  // Rosters
  useEffect(() => {
    console.log("Players effect");
    setFilteredWaitListPlayers(waitListPlayers);
    setFilteredAcceptListPlayers(acceptedPlayers);
    setFilteredPlayers(players);
  }, [players]);

  useEffect(() => {
    const searchResult = waitListPlayers.filter((player) =>
      (player.firstName + player.lastName)
        .toLowerCase()
        .includes(waitListKeyword.toLowerCase())
    );
    setFilteredWaitListPlayers(searchResult);
  }, [waitListKeyword]);

  useEffect(() => {
    const searchResult = acceptedPlayers.filter((player) =>
      (player.firstName + player.lastName)
        .toLowerCase()
        .includes(acceptListKeyword.toLowerCase())
    );
    setFilteredAcceptListPlayers(searchResult);
  }, [acceptListKeyword]);

  // Teams
  useEffect(() => {
    setFilteredTeams(teams);
    setFilteredStandings(teams);
  }, [teams]);

  useEffect(() => {
    console.log(teamKeyword);
    const searchResult = teams.filter((team) =>
      team.name.toLowerCase().includes(teamKeyword.toLowerCase())
    );
    setFilteredTeams(searchResult);
  }, [teamKeyword]);

  // Schedule
  // useEffect(() => {
  //   setFilteredMatches(matches);
  // }, [matches]);

  // useEffect(() => {
  //   console.log(scheduleKeyword);
  // }, [scheduleKeyword]);

  // Standings
  useEffect(() => {
    const searchResult = teams.filter((team) =>
      team.name.toLowerCase().includes(standingsKeyword.toLowerCase())
    );
    setFilteredStandings(searchResult);
  }, [standingsKeyword]);

  // All Playerlist
  useEffect(() => {
    console.log("player hook");
    const searchResult = players.filter(
      (player) =>
        player.teamId !== 0 &&
        (player.firstName + player.lastName)
          .toLowerCase()
          .includes(playerKeyword.toLowerCase())
    );
    setFilteredPlayers(searchResult);
  }, [playerKeyword]);

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
        .post(apis.acceptPlayer, { waitItemChecked, leagueId: leagueId })
        .then((res) => {
          actions.getPlayers(dispatch);
          setWaitItemChecked({});
        })
        .catch((error) => alert(error.message));
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
        .catch((error) => alert(error.message));
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

  const fileUploadRef = useRef();
  const [chosenFile, setChosenFile] = useState();
  const [previewURL, setPreviewURL] = useState("");

  const editLeague = () => {
    const formData = new FormData();
    formData.append("id", leagueId);
    formData.append("userId", user.id);
    formData.append("logo", chosenFile);
    formData.append("name", leagueName);
    formData.append("description", leagueDescription);
    formData.append("startDate", leagueStartDate);
    formData.append("endDate", leagueEndDate);

    // dispatch({ type: actions.CLOSE_LEAGUE_DIALOG });
    axios.post(apis.updateLeague, formData).then((res) => {
      actions.getLeagues(dispatch);
      alert(res.data.message);
    });
  };

  const deleteLeague = () => {
    dispatch({ type: actions.OPEN_DELETE_LEAGUE_DIALOG, payload: league });
  };

  if (!league) return null;

  return (
    <div className="flex flex-col flex-grow">
      <p className="font-dark-gray my-[20px]">
        <Link to="/">
          <span className="underline">My Leagues</span>
        </Link>
        <span className="text-sky-500"> &gt; {league?.name}</span>
      </p>

      <div className="rounded-main bg-slate flex-grow p-default">
        <div className="w-full px-2 sm:px-0 h-full flex flex-col">
          <Tab.Group defaultIndex={tab}>
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
              {tab == 0 && user?.id == league?.userId ? (
                <button
                  onClick={handleInvitePlayer}
                  className="w-36 h-[42px] bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold"
                >
                  Invite Player
                </button>
              ) : tab == 1 && user?.id == league?.userId ? (
                <button
                  onClick={handleCreateTeam}
                  className="w-36 h-[42px] bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold"
                >
                  Create Team
                </button>
              ) : tab == 2 && user?.id == league?.userId ? (
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
              {league?.userId == user?.id ? (
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
                          {filteredWaitListPlayers.length}
                        </p>
                      </div>
                      <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-dark-gray" />
                      <div className="flex w-full justify-between space-x-10 my-5">
                        <div className="flex flex-grow space-x-3 ">
                          <Input
                            className="flex-grow rounded-lg h-[38px] dark:bg-charcoal bg-white text-xs"
                            icon={search}
                            placeholder="Search"
                            value={waitListKeyword}
                            onChange={(e) => {
                              setWaitListKeyword(e.target.value);
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
                          filteredWaitListPlayers.length
                            ? ""
                            : "dark:bg-light-gray justify-center"
                        } rounded-default`}
                      >
                        {filteredWaitListPlayers.length ? (
                          filteredWaitListPlayers.map((player, idx) => (
                            <ListItem
                              key={idx}
                              className="mb-5"
                              avatar={player.avatar}
                              name={player.firstName + " " + player.lastName}
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
                          Available Players
                        </p>
                        <p className="text-white text-xl font-semibold">
                          {filteredAcceptListPlayers.length}
                        </p>
                      </div>
                      <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-dark-gray" />
                      <div className="flex w-full justify-between space-x-10 my-5">
                        <div className="flex flex-grow space-x-3 ">
                          <Input
                            className="flex-grow rounded-lg h-[38px] dark:bg-charcoal bg-white text-xs"
                            icon={search}
                            placeholder="Search"
                            value={acceptListKeyword}
                            onChange={(e) =>
                              setAcceptListKeyword(e.target.value)
                            }
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
                          filteredAcceptListPlayers.length
                            ? ""
                            : "dark:bg-light-gray justify-center"
                        } rounded-default`}
                      >
                        {filteredAcceptListPlayers.length ? (
                          filteredAcceptListPlayers.map((player, idx) => (
                            <ListItem
                              key={idx}
                              avatar={player.avatar}
                              name={player.firstName + " " + player.lastName}
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
              ) : (
                ""
              )}

              {/* Teams */}
              <Tab.Panel
                key={1}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                <hr className="h-px my-4 bg-charcoal border-0" />
                <Input
                  className="rounded-lg h-[42px] text-xs"
                  icon={search}
                  placeholder="Search Teams"
                  value={teamKeyword}
                  onChange={(e) => setTeamKeyword(e.target.value)}
                />
                {filteredTeams.length > 0 ? (
                  <>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      {filteredTeams.map((team, idx) => (
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
                <hr className="h-px my-4 bg-charcoal border-0" />
                {matches.length > 0 ? (
                  <>
                    {/* <Input
                      className="rounded-lg text-xs"
                      icon={search}
                      placeholder="Search Schedules"
                      value={scheduleKeyword}
                      onChange={(e)=>{
                        setScheduleKeyword(e.target.value);
                      }}
                    /> */}
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
                <hr className="h-px my-4 bg-charcoal border-0" />
                <div className="flex space-x-3">
                  <Input
                    className="rounded-lg flex-grow text-xs"
                    icon={search}
                    placeholder="Search Standings"
                    value={standingsKeyword}
                    onChange={(e) => {
                      setStandingsKeyword(e.target.value);
                    }}
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
                {filteredStandings.length > 0 ? (
                  <StandingTable teams={filteredStandings}></StandingTable>
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
                <hr className="h-px my-4 bg-charcoal border-0" />
                <div className="flex space-x-3">
                  <Input
                    className="rounded-lg flex-grow text-xs"
                    icon={search}
                    placeholder="Search Players"
                    value={playerKeyword}
                    onChange={(e) => {
                      setPlayerKeyword(e.target.value);
                    }}
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
                {filteredPlayers.length > 0 ? (
                  <PlayerTable players={filteredPlayers}></PlayerTable>
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
                <hr className="h-px my-4 bg-charcoal border-0" />
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="flex flex-col space-x-3 items-center">
                    <div>
                      <div className="flex space-x-3 items-center">
                        <input
                          type="file"
                          hidden
                          ref={fileUploadRef}
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files.length) {
                              const file = files[0];
                              setChosenFile(file);
                              setPreviewURL(URL.createObjectURL(file));
                            }
                          }}
                        />
                        <img
                          onClick={() => {
                            fileUploadRef.current?.click();
                          }}
                          src={previewURL ? previewURL : league?.logo}
                          className="w-24 h-24 rounded-lg cursor-pointer"
                          alt=""
                        />
                        <Input
                          className="rounded-lg flex-grow text-xs "
                          placeholder="League Name"
                          value={leagueName}
                          onChange={(e) => setLeagueName(e.target.value)}
                        ></Input>
                      </div>
                      <textarea
                        id="message"
                        rows="6"
                        className="block p-2.5 w-full text-xs text-gray-900 rounded-lg border border-charcoal focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-charcoal dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none outline-none"
                        placeholder="Describe your League*"
                        value={leagueDescription}
                        onChange={(e) => setLeagueDescription(e.target.value)}
                      ></textarea>
                      <Input
                        className="text-xs rounded-default my-5"
                        option={calendar}
                        placeholder="Enter Season Start Date*"
                        value={leagueStartDate}
                        onChange={(e) => setLeagueStartDate(e.target.value)}
                      />
                      <Input
                        className="text-xs rounded-default"
                        option={calendar}
                        placeholder="Enter Season End Date*"
                        value={leagueEndDate}
                        onChange={(e) => setLeagueEndDate(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-grow">
                      <button
                        onClick={editLeague}
                        className="bg-primary h-12 text-white font-bold text-sm w-[76px] rounded-default hover:opacity-70"
                      >
                        Save
                      </button>
                      <button
                        onClick={deleteLeague}
                        className="bg-danger h-12 text-white font-bold text-sm w-[76px] rounded-default hover:opacity-70"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
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
