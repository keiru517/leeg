import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import search from "../../assets/img/dark_mode/search.png";
import Input from "../../components/Input";
import ListItem from "../../components/ListItem";
import Select from "../../components/Select";
import Button from "../../components/Button";
import TeamCard from "../../components/Card/Team";
import { Tab } from "@headlessui/react";
import LeagueModal from "../../components/Modal/LeagueModal";
import InvitePlayerModal from "../../components/Modal/InvitePlayerModal";
import TeamModal from "../../components/Modal/TeamModal";
import MatchModal from "../../components/Modal/MatchModal";
import AdminModal from "../../components/Modal/AdminModal";
import MatchTable from "../../components/Table/Match";
import StandingTable from "../../components/Table/Standing";
import AdminTable from "../../components/Table/Admin";
import PlayerTable from "../../components/Table/Player";
import RosterTable from "../../components/Table/Roster";
import TimePicker from "../../components/Timer/TimePicker";
import calendar from "../../assets/img/dark_mode/calendar.png";
import apis from "../../utils/apis";
import * as actions from "../../actions";
import toggleOn from "../../assets/img/dark_mode/toggle-on.png";
import toggleOff from "../../assets/img/dark_mode/toggle-off.png";

const League = () => {
  let { leagueId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const tab = queryParams.get("tab");

  const user = useSelector((state) => state.home.user);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const admins = useSelector((state) => state.home.admins).filter(
    (admin) => admin.leagueId == league?.id && admin.isDeleted !== 1
  );

  const isAdmin =
    admins.some((admin) => admin.userId == user?.id) ||
    league?.userId == user?.id;

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

  // this is used for Players tab
  const allPlayers = useSelector((state) => state.home.players).filter(
    (player) => player.leagueId == leagueId && player.isAcceptedList
  );

  const matches = useSelector((state) => state.home.matches).filter(
    (match) => match.leagueId == leagueId && match.isDeleted == 0
  );

  const options = [
    { id: 0, name: "Recent" },
    { id: 1, name: "Alphabetical" },
  ];

  const rosterOptions = [
    { id: 0, name: "WaitList" },
    { id: 1, name: "AcceptedList" },
  ];

  const [value, setValue] = useState("Sort by");
  const [rosterValue, setRosterValue] = useState(rosterOptions[0].name);
  const [rosters, setRosters] = useState([]);
  useEffect(() => {
    var result = players?.filter((roster) => roster.isWaitList === 1);
    if (rosterValue == "WaitList") {
      result = players?.filter((roster) => roster.isWaitList === 1);
    } else {
      result = players?.filter((roster) => roster.isAcceptedList === 1);
    }
    setRosters(result);
  }, [rosterValue]);

  var categories = [];
  if (isAdmin) {
    // if (league?.userId == user?.id) {
    categories = [
      // "Blog",
      "Manage Rosters",
      "Teams",
      "Schedule",
      "Standings",
      "Players",
      "Settings",
    ];
  } else {
    categories = ["Teams", "Schedule", "Standings", "Players"];
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [waitItemChecked, setWaitItemChecked] = useState({});
  const [acceptedItemChecked, setAcceptedItemChecked] = useState({});

  const [tab, setTab] = useState(0);
  const handleCategory = (idx) => {
    // navigate(`/league/${leagueId}?tab=${idx}`);
    setTab(idx);
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
    actions.getUsers(dispatch);
    actions.getLeagues(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getMatchups(dispatch);
    actions.getPlayers(dispatch);
    actions.getAdmins(dispatch);
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
  const [filteredTeams, setFilteredTeams] = useState(teams);

  const [scheduleKeyword, setScheduleKeyword] = useState("");
  const [filteredMatches, setFilteredMatches] = useState([]);

  const [standingsKeyword, setStandingsKeyword] = useState("");
  const [filteredStandings, setFilteredStandings] = useState([]);

  const [playerKeyword, setPlayerKeyword] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  // Rosters
  useEffect(() => {
    setFilteredWaitListPlayers(waitListPlayers);
    setFilteredAcceptListPlayers(acceptedPlayers);
    setFilteredPlayers(allPlayers);
    if (rosterValue === "WaitList") {
      setRosters(players?.filter((roster) => roster.isWaitList === 1));
    } else {
      setRosters(players?.filter((roster) => roster.isAcceptedList === 1));
    }
  }, [
    players.length,
    waitListPlayers.length,
    acceptedPlayers.length,
    allPlayers.length,
  ]);

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
  // useEffect(() => {
  //   setFilteredTeams(teams);
  //   setFilteredStandings(teams);
  // }, [teams.length]);

  // useEffect(() => {
  //   const searchResult = teams.filter((team) =>
  //     team.name.toLowerCase().includes(teamKeyword.toLowerCase())
  //   );
  //   setFilteredTeams(searchResult);
  // }, [teamKeyword]);

  // Standings
  // useEffect(() => {
  //   const searchResult = teams.filter((team) =>
  //     team.name.toLowerCase().includes(standingsKeyword.toLowerCase())
  //   );
  //   setFilteredStandings(searchResult);
  // }, [standingsKeyword]);

  // Players
  useEffect(() => {
    const searchResult = allPlayers.filter((player) =>
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
        .catch((error) => alert(error.response.data.message));
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
        .catch((error) => alert(error.response.data.message));
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

  // Settings
  const fileUploadRef = useRef();
  const [chosenFile, setChosenFile] = useState();
  const [previewURL, setPreviewURL] = useState("");

  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [isAllowedFan, setIsAllowedFan] = useState("");
  const [displayLeagueId, setDisplayLeagueId] = useState("");
  const [displayPosition, setDisplayPosition] = useState("");
  const [displayAttempts3, setDisplayAttempts3] = useState("");
  const [displayAttempts2, setDisplayAttempts2] = useState("");
  const [displayAttempts1, setDisplayAttempts1] = useState("");
  const [displayBlocks, setDisplayBlocks] = useState("");
  const [displayRebounds, setDisplayRebounds] = useState("");
  const [displayAssists, setDisplayAssists] = useState("");
  const [displayFouls, setDisplayFouls] = useState("");
  const [displaySteals, setDisplaySteals] = useState("");
  const [displayTurnovers, setDisplayTurnovers] = useState("");
  const [requirePassword, setRequirePassword] = useState("");

  useEffect(() => {
    setMinute(league?.minute);
    setSecond(league?.second);
    setIsAllowedFan(league?.isAllowedFan);
    setDisplayPosition(league?.displayPosition);
    setDisplayAttempts3(league?.displayAttempts3);
    setDisplayAttempts2(league?.displayAttempts2);
    setDisplayAttempts1(league?.displayAttempts1);
    setDisplayBlocks(league?.displayBlocks);
    setDisplayRebounds(league?.displayRebounds);
    setDisplayAssists(league?.displayAssists);
    setDisplayFouls(league?.displayFouls);
    setDisplaySteals(league?.displaySteals);
    setDisplayTurnovers(league?.displayTurnovers);
    setRequirePassword(league?.requirePassword);
  }, [league]);

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

  const toggleFan = () => {
    axios
      .post(apis.allowFan, { leagueId: leagueId, status: !isAllowedFan })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setIsAllowedFan(!isAllowedFan);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const togglePosition = () => {
    axios
      .post(apis.togglePosition, {
        leagueId: leagueId,
        status: !displayPosition,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplayPosition(!displayPosition);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const toggleAttempts3 = () => {
    axios
      .post(apis.toggleAttempts3, {
        leagueId: leagueId,
        status: !displayAttempts3,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplayAttempts3(!displayAttempts3);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const toggleAttempts2 = () => {
    axios
      .post(apis.toggleAttempts2, {
        leagueId: leagueId,
        status: !displayAttempts2,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplayAttempts2(!displayAttempts2);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const toggleAttempts1 = () => {
    axios
      .post(apis.toggleAttempts1, {
        leagueId: leagueId,
        status: !displayAttempts1,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplayAttempts1(!displayAttempts1);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const toggleBlocks = () => {
    axios
      .post(apis.toggleBlocks, {
        leagueId: leagueId,
        status: !displayBlocks,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplayBlocks(!displayBlocks);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const toggleRebounds = () => {
    axios
      .post(apis.toggleRebounds, {
        leagueId: leagueId,
        status: !displayRebounds,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplayRebounds(!displayRebounds);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const toggleAssists = () => {
    axios
      .post(apis.toggleAssists, {
        leagueId: leagueId,
        status: !displayAssists,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplayAssists(!displayAssists);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const toggleFouls = () => {
    axios
      .post(apis.toggleFouls, {
        leagueId: leagueId,
        status: !displayFouls,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplayFouls(!displayFouls);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const toggleSteals = () => {
    axios
      .post(apis.toggleSteals, {
        leagueId: leagueId,
        status: !displaySteals,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplaySteals(!displaySteals);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const toggleTurnovers = () => {
    axios
      .post(apis.toggleTurnovers, {
        leagueId: leagueId,
        status: !displayTurnovers,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplayTurnovers(!displayTurnovers);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const togglePassword = () => {
    console.timeLog("password");
    axios
      .post(apis.togglePassword, {
        leagueId: leagueId,
        status: !requirePassword,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setRequirePassword(!requirePassword);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleTimer = () => {
    axios
      .post(apis.updateTimer, {
        leagueId,
        minute,
        second,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        alert(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLeague = () => {
    dispatch({ type: actions.OPEN_DELETE_LEAGUE_DIALOG, payload: league });
  };

  const inviteAdmin = () => {
    dispatch({ type: actions.OPEN_ADMIN_DIALOG, payload: true });
  };

  return (
    <div className="flex flex-col flex-grow">
      <p className="font-dark-gray my-[20px]">
        <Link to="/">
          <span className="underline">My Leagues</span>
        </Link>
        <span className="text-sky-500"> &gt; {league?.name}</span>
      </p>
      <div className="flex items-center space-x-3 mb-[20px]">
        <img src={league?.logo} className="w-10 h-10 rounded-lg"></img>
        <p className="text-black dark:text-white text-lg">{league?.name}</p>
      </div>
      <div className="rounded-default bg-white dark:bg-slate flex-grow p-default">
        <div className="w-full px-2 sm:px-0 h-full flex flex-col">
          <Tab.Group>
            <div className="flex justify-between">
              <Tab.List className="flex justify-start space-x-5 rounded-xl bg-transparent p-1 ">
                {categories.map((category, idx) => (
                  <Tab
                    key={idx}
                    className={({ selected }) =>
                      classNames(
                        "py-2.5 text-sm font-medium leading-5 text-gray-500 dark:text-gray-300 px-3",
                        " focus:outline-none ",
                        selected
                          ? "divide-[bg-sky-500] text-black dark:text-white border-b-2 border-sky-500"
                          : " rounded-lg hover:bg-white/[0.12] "
                      )
                    }
                    onClick={() => handleCategory(idx)}
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              {tab == 0 && isAdmin ? (
                <button
                  onClick={handleInvitePlayer}
                  className="w-36 h-[42px] bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold"
                >
                  Invite Player
                </button>
              ) : tab == 1 && isAdmin ? (
                <button
                  onClick={handleCreateTeam}
                  className="w-36 h-[42px] bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold"
                >
                  Create Team
                </button>
              ) : tab == 2 && isAdmin ? (
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
              {isAdmin ? (
                <Tab.Panel
                  key={0}
                  className={classNames(
                    "rounded-xl flex flex-col justify-between w-full h-full"
                  )}
                >
                  <hr className="h-px my-4 bg-charcoal border-0" />
                  <div className="flex space-x-3">
                    <Input
                      className="flex-grow rounded-lg h-[38px] bg-transparent text-xs"
                      icon={search}
                      placeholder="Search rosters"
                      value={waitListKeyword}
                      onChange={(e) => {
                        setWaitListKeyword(e.target.value);
                      }}
                    />
                    <Select
                      className="w-[144px] rounded-lg text-xs"
                      options={rosterOptions}
                      handleClick={(e) => setRosterValue(e.name)}
                      value={rosterValue}
                    >
                      {rosterValue}
                    </Select>
                  </div>
                  {rosters.filter((roster) =>
                    (roster.firstName + roster.lastName)
                      .toLowerCase()
                      .includes(waitListKeyword.toLowerCase())
                  ).length > 0 ? (
                    <RosterTable
                      rosters={rosters.filter((roster) =>
                        (roster.firstName + roster.lastName)
                          .toLowerCase()
                          .includes(waitListKeyword.toLowerCase())
                      )}
                      rosterValue={rosterValue}
                      setRosterValue={setRosterValue}
                    />
                  ) : (
                    <div className="flex items-center flex-grow">
                      <p className="text-2xl text-black dark:text-white w-full text-center">
                        {
                          rosterValue === "WaitList"? "No WaitList to show!":"Now AcceptedList to show!"
                        }
                      </p>
                    </div>
                  )}

                  {/* <div className="h-full">
                    <div className="bg-light-charcoal dark:bg-charcoal flex flex-col h-full min-h-[420px] p-default rounded-main">
                      <div className="flex w-full justify-between space-x-10">
                        <div className="flex flex-grow space-x-3">
                          <Input
                            className="flex-grow rounded-lg h-[38px] dark:bg-charcoal text-xs"
                            icon={search}
                            placeholder="Search"
                            value={waitListKeyword}
                            onChange={(e) => {
                              setWaitListKeyword(e.target.value);
                            }}
                          />
                          <Select
                            className="w-[144px] rounded-lg text-xs"
                            options={rosterOptions}
                            handleClick={(e) => setRosterValue(e.name)}
                            value={rosterValue}
                          >
                            {rosterValue}
                          </Select>
                        </div>
                      </div>
                      <div
                        className={`overflow-y-scroll:auto h-4/6 flex flex-col items-center flex-grow ${
                          players.length
                            ? ""
                            : "dark:bg-light-gray justify-center"
                        } rounded-default`}
                      >
                        <RosterTable
                          rosters={rosters.filter((roster) =>
                            (roster.firstName + roster.lastName)
                              .toLowerCase()
                              .includes(waitListKeyword.toLowerCase())
                          )}
                          rosterValue={rosterValue}
                          setRosterValue={setRosterValue}
                        />
                      </div>
                    </div>
                  </div> */}
                  <InvitePlayerModal></InvitePlayerModal>
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
                  className="rounded-lg h-[38px] text-xs"
                  icon={search}
                  placeholder="Search teams"
                  value={teamKeyword}
                  onChange={(e) => setTeamKeyword(e.target.value)}
                />
                {teams.filter((team) =>
                  team.name.toLowerCase().includes(teamKeyword.toLowerCase())
                ).length > 0 ? (
                  <>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      {teams
                        .filter((team) =>
                          team.name
                            .toLowerCase()
                            .includes(teamKeyword.toLowerCase())
                        )
                        .map((team, idx) => (
                          <TeamCard team={team} key={idx}></TeamCard>
                        ))}
                      {/* {filteredTeams.map((team, idx) => (
                        <TeamCard team={team} key={idx}></TeamCard>
                      ))} */}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-black dark:text-white w-full text-center">
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
                    <MatchTable
                      matches={matches}
                      leagueId={leagueId}
                    ></MatchTable>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-black dark:text-white w-full text-center">
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
                    className="rounded-lg flex-grow h-[38px] text-xs"
                    icon={search}
                    placeholder="Search standings"
                    value={standingsKeyword}
                    onChange={(e) => {
                      setStandingsKeyword(e.target.value);
                    }}
                  />
                  {/* <Select
                    className="text-xs"
                    options={options}
                    handleClick={(e) => setValue(e.name)}
                    value={value}
                  >
                    {value}
                  </Select> */}
                </div>
                {teams.filter((team) =>
                  team.name
                    .toLowerCase()
                    .includes(standingsKeyword.toLowerCase())
                ).length > 0 ? (
                  <StandingTable
                    teams={teams.filter((team) =>
                      team.name
                        .toLowerCase()
                        .includes(standingsKeyword.toLowerCase())
                    )}
                  ></StandingTable>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-black dark:text-white w-full text-center">
                      No Standings to show!
                    </p>
                  </div>
                )}
              </Tab.Panel>

              {/* Players */}
              <Tab.Panel
                key={4}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                <hr className="h-px my-4 bg-charcoal border-0" />
                <div className="flex space-x-3">
                  <Input
                    className="rounded-lg h-[38px] flex-grow text-xs"
                    icon={search}
                    placeholder="Search players"
                    value={playerKeyword}
                    onChange={(e) => {
                      setPlayerKeyword(e.target.value);
                    }}
                  />
                  {/* <Select
                    className="text-xs"
                    options={options}
                    handleClick={(e) => setValue(e.name)}
                    value={value}
                  >
                    {value}
                  </Select> */}
                </div>
                {filteredPlayers.length > 0 ? (
                  <PlayerTable
                    players={filteredPlayers}
                    league={league}
                  ></PlayerTable>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-black dark:text-white w-full text-center">
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
                  {/* League Settings */}
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
                        className="block p-2.5 w-full text-xs text-gray-900 rounded-lg border border-charcoal focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-charcoal dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none outline-none mt-3"
                        placeholder="Describe your League*"
                        value={leagueDescription}
                        onChange={(e) => setLeagueDescription(e.target.value)}
                      ></textarea>
                      <Input
                        className="text-xs rounded-default my-3"
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
                    <div className="flex flex-grow mt-3">
                      <button
                        onClick={editLeague}
                        className="bg-primary h-button text-white font-bold text-sm w-[76px] rounded-default hover:opacity-70"
                      >
                        Save
                      </button>
                      <button
                        onClick={deleteLeague}
                        className="bg-danger h-button text-white font-bold text-sm w-[76px] rounded-default hover:opacity-70"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {/* Stats */}
                  <div className="flex flex-col space-y-3 items-center">
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Allow Fan view
                      </p>
                      <img
                        src={isAllowedFan ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleFan}
                      />
                    </div>
                    {/* <div className="flex">
                      <p className="text-xs dark:text-white text-black">
                        Display League ID
                      </p>
                      <img
                        src={displayLeagueId ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleLeagueId}
                      />
                    </div> */}
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Display Position
                      </p>
                      <img
                        src={displayPosition ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={togglePosition}
                      />
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Display 3 Attempts
                      </p>
                      <img
                        src={displayAttempts3 ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleAttempts3}
                      />
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Display 2 Attempts
                      </p>
                      <img
                        src={displayAttempts2 ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleAttempts2}
                      />
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Display FT Attempts
                      </p>
                      <img
                        src={displayAttempts1 ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleAttempts1}
                      />
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Display Blocks
                      </p>
                      <img
                        src={displayBlocks ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleBlocks}
                      />
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Display Rebounds
                      </p>
                      <img
                        src={displayRebounds ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleRebounds}
                      />
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Display Assists
                      </p>
                      <img
                        src={displayAssists ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleAssists}
                      />
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Display Fouls
                      </p>
                      <img
                        src={displayFouls ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleFouls}
                      />
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Display Steals
                      </p>
                      <img
                        src={displaySteals ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleSteals}
                      />
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Display Turnovers
                      </p>
                      <img
                        src={displayTurnovers ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={toggleTurnovers}
                      />
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="text-xs dark:text-white text-black">
                        Require Passowrd to Apply
                      </p>
                      <img
                        src={requirePassword ? toggleOn : toggleOff}
                        alt=""
                        className="w-8 cursor-pointer"
                        onClick={togglePassword}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 items-center">
                    <div className="flex">
                      <p className="text-xs dark:text-white text-black">
                        Admin Access
                      </p>
                    </div>
                    <button
                      onClick={inviteAdmin}
                      className="mt-5 bg-primary h-12 text-white font-bold text-sm w-[76px] rounded-default hover:opacity-70"
                    >
                      Invite Admin
                    </button>

                    <AdminTable user={user} leagueId={leagueId} />
                  </div>

                  <AdminModal user={user} leagueId={leagueId} />
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
