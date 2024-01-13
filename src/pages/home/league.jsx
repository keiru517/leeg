import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import searchIconDark from "../../assets/img/dark_mode/search-icon-dark.svg";
import searchIconLight from "../../assets/img/dark_mode/search-icon-light.svg";
import Input from "../../components/Input";
import ListItem from "../../components/ListItem";
import Select from "../../components/Select";
import Button from "../../components/Button";
import TeamCard from "../../components/Card/Team";
import Tab from "@mui/material/Tab";
import { TabPanel, TabContext } from "@mui/lab";
import { Tabs } from "@mui/material";
import LeagueModal from "../../components/Modal/LeagueModal";
import LeaguePassowrdModal from "../../components/Modal/LeaguePasswordModal";
import InvitePlayerModal from "../../components/Modal/InvitePlayerModal";
import TeamModal from "../../components/Modal/TeamModal";
import MatchModal from "../../components/Modal/MatchModal";
import AdminModal from "../../components/Modal/AdminModal";
import MatchTable from "../../components/Table/Match";
import StandingTable from "../../components/Table/Standing";
import AdminTable from "../../components/Table/Admin";
import PlayerTable from "../../components/Table/Player";
import RosterTable from "../../components/Table/Roster";
// import TimePicker from "../../components/Timer/TimePicker";
import calendar from "../../assets/img/dark_mode/calendar.png";
import apis from "../../utils/apis";
import * as actions from "../../actions";
import toggleOn from "../../assets/img/dark_mode/toggle-on.png";
import toggleOff from "../../assets/img/dark_mode/toggle-off.png";
import DatePicker from "../../components/DatePicker";
import TimerInput from "../../components/TimerInput";

const League = () => {
  let { leagueId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get("tab");

  const user = useSelector((state) => state.home.user);
  const darkMode = useSelector((state) => state.home.dark_mode);
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

  const player = players.find((player) => player.userId == user.id);

  // this is used for Players tab
  const allPlayers = useSelector((state) => state.home.players).filter(
    (player) => player.leagueId == leagueId && (player.isAcceptedList || (player.isSubstitute&& league?.displaySubstitutes))
  );

  const matches = useSelector((state) => state.home.matches).filter(
    (match) => match.leagueId == leagueId && match.isDeleted == 0
  );

  const rosterOptions = [
    { id: 0, name: "Waitlisted" },
    { id: 1, name: "Accepted" },
  ];

  const [rosterValue, setRosterValue] = useState(rosterOptions[0].name);
  const [rosters, setRosters] = useState([]);
  useEffect(() => {
    var result = players?.filter((roster) => roster.isWaitList === 1);
    if (rosterValue == "Waitlisted") {
      result = players?.filter((roster) => roster.isWaitList === 1);
    } else {
      result = players?.filter((roster) => roster.isAcceptedList === 1);
    }
    setRosters(result);
  }, [rosterValue]);

  let categories = [];
  if (isAdmin) {
    // if (league?.userId == user?.id) {
    categories = [
      // "Blog",
      // "Teams",=>manage rosters
      "Teams",
      "Matches",
      "Standings",
      "Players",
      // "Manage Rosters", => Admissions
      "Admissions",
      "Settings",
    ];
  } else {
    categories = ["Teams", "Matches", "Standings", "Players", "Settings"];
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [waitItemChecked, setWaitItemChecked] = useState({});
  const [acceptedItemChecked, setAcceptedItemChecked] = useState({});

  // const [tab, setTab] = useState(0);
  const handleCategory = (data) => {
    navigate(`/league/${leagueId}?tab=${data}`);
    // setTab(idx);
    setWaitListKeyword("");
    setAcceptListKeyword("");
    setTeamKeyword("");
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
    // actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getUsers(dispatch);
    actions.getLeagues(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getMatchups(dispatch);
    actions.getPlayers(dispatch);
    actions.getSubstitutes(dispatch);
    actions.getAdmins(dispatch);
  }, []);

  useEffect(() => {
    setLeagueName(league?.name);
    setLeagueDescription(league?.description);
    setLeagueStartDate(league?.startDate);
    setLeagueEndDate(league?.endDate);
    setTime(league?.time)
  }, [league]);


  // Search section
  const [waitListKeyword, setWaitListKeyword] = useState("");
  const [filteredWaitListPlayers, setFilteredWaitListPlayers] = useState([]);

  const [acceptListKeyword, setAcceptListKeyword] = useState("");
  const [filteredAcceptListPlayers, setFilteredAcceptListPlayers] = useState(
    []
  );

  const [teamKeyword, setTeamKeyword] = useState("");
  const [matchKeyword, setMatchKeyword] = useState("");

  const [standingsKeyword, setStandingsKeyword] = useState("");

  const [playerKeyword, setPlayerKeyword] = useState("");

  // Rosters
  useEffect(() => {
    setFilteredWaitListPlayers(waitListPlayers);
    setFilteredAcceptListPlayers(acceptedPlayers);
    if (rosterValue === "Waitlisted") {
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
  const [displaySubstitutes, setDisplaySubstitutes] = useState("");
  const [displayPosition, setDisplayPosition] = useState("");
  const [displayJerseyNumber, setDisplayJerseyNumber] = useState("");
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
    setDisplaySubstitutes(league?.displaySubstitutes);
    setDisplayPosition(league?.displayPosition);
    setDisplayJerseyNumber(league?.displayJerseyNumber);
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
    formData.append("period", period);
    formData.append("time", time);
    console.log("time", time)

    // dispatch({ type: actions.CLOSE_LEAGUE_DIALOG });
    axios.post(apis.updateLeague, formData).then((res) => {
      actions.getLeagues(dispatch);
      alert(res.data.message);
    });
  };

  const [period, setPeriod] = useState(league?.period);
  const [time, setTime] = useState(league?.time);

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

  const togglePassword = () => {
    // if the user allow passwword
    if (!requirePassword) {
      dispatch({
        type: actions.OPEN_SET_LEAGUE_PASSWORD_DIALOG,
        payload: league,
      });
    } else {
      dispatch({
        type: actions.OPEN_REMOVE_LEAGUE_PASSWORD_DIALOG,
        payload: league,
      });
    }
    // setRequirePassword(!requirePassword);

    // axios
    //   .post(apis.togglePassword, {
    //     leagueId: leagueId,
    //     status: !requirePassword,
    //   })
    //   .then((res) => {
    //     actions.getLeagues(dispatch);
    //     actions.getPlayers(dispatch);
    //     actions.getMatches(dispatch);
    //     actions.getMatchups(dispatch);
    //     setRequirePassword(!requirePassword);
    //   })
    //   .catch((error) => {
    //     alert(error.response.data.message);
    //   });
  };

  const toggleSubstitutes = () => {
    axios
      .post(apis.toggleSubstitutes, {
        leagueId: leagueId,
        status: !displaySubstitutes,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplaySubstitutes(!displaySubstitutes);
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

  const toggleJerseyNumber = () => {
    axios
      .post(apis.toggleJerseyNumber, {
        leagueId: leagueId,
        status: !displayJerseyNumber,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        actions.getPlayers(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        setDisplayJerseyNumber(!displayJerseyNumber);
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

  const leaveLeague = (e) => {
    let player = players.find(
      (player) => player.userId == user.id && player.leagueId == leagueId
    );
    console.log(player);
    // if (player) {
    actions.removeFromLeague(dispatch, { [player?.id]: true });
    navigate("/");
    // }
  };
  const inviteAdmin = () => {
    dispatch({ type: actions.OPEN_ADMIN_DIALOG, payload: true });
  };

  if (time === undefined) return <></>;

  return (
    <div className="flex flex-col flex-grow">
      <p className="flex font-dark-gray my-3 items-center">
        <Link to="/">
          <span className="text-sky-500 hover:underline">My Leagues</span>
        </Link>
        <span className="">&nbsp; &gt; &nbsp;</span>
        <div className="flex items-center space-x-3">
          <p className="">{league?.name}</p>
        </div>
      </p>
      <div className="rounded-default bg-white dark:bg-slate flex-grow sm:p-default">
        <div className="w-full px-2 sm:px-0 h-full flex flex-col pt-3">
          <TabContext value={tab}>
            <div className="flex justify-between">
              <Tabs
                variant="scrollable"
                allowScrollButtonsMobile={true}
                scrollButtons="auto"
                selectionFollowsFocus={true}
                sx={{
                  ".MuiTabs-scrollButtons.Mui-disabled": { opacity: 0.3 },
                  ".MuiTabs-scrollButtons": {
                    color: darkMode ? "white" : "black",
                  },
                }}
                value={Number(tab)}
              >
                {categories.map((category, idx) => (
                  <Tab
                    key={category}
                    label={category}
                    sx={{
                      color: "gray",
                      borderRadius: "5px",
                      "&:hover": { backgroundColor: "#ffffff15" },
                      // "&:hover": { backgroundColor: "#ffffff15" },
                      "&.Mui-selected": {
                        backgroundColor: darkMode ? "#ffffff15" : "#f4f4f4",
                        color: darkMode ? "white" : "black",
                        borderBottom: "2px solid rgb(37, 99, 235)",
                      },
                    }}
                    onClick={() => handleCategory(idx)}
                  />
                ))}
              </Tabs>
            </div>
            <div className="flex-grow flex items-center ">
              {/* Blog */}
              {/* <TabPanel
                value="0"
                sx={{
                  padding: "10px !important",
                }}
                className={classNames(
                  "rounded-xl justify-between w-full h-full"
                )}
              >
                <hr className="h-px mb-4 bg-charcoal border-0" />
                <div className="flex h-full space-x-4">
                  <div className="w-full border border-dark-gray flex flex-col h-full min-h-[420px] p-default rounded-main">
                    <div className="flex justify-between w-full">
                      <p className="text-black dark:text-white text-xl font-semibold">
                        Blogs for this league
                      </p>
                      <p className="text-black dark:text-white text-xl font-semibold">
                        {filteredWaitListPlayers.length}
                      </p>
                    </div>
                    <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-dark-gray" />
                    <div className="flex w-full justify-between space-x-10 my-3">
                      <div className="flex flex-grow space-x-3 ">
                        <Input
                          className="flex-grow rounded-lg h-[38px] dark:bg-charcoal text-xs"
                          icon={darkMode ? searchIconDark : searchIconLight}
                          placeholder="Search"
                          value={waitListKeyword}
                          onChange={(e) => {
                            setWaitListKeyword(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <Button className="text-sm bg-primary w-[100px] h-[38px] rounded hover:opacity-70">
                          Add blog
                        </Button>
                      </div>
                    </div>
                    <div
                      className={`overflow-y-scroll h-4/6 flex flex-col items-center flex-grow ${
                        filteredWaitListPlayers.length ? "" : "justify-center"
                      } rounded-default`}
                    >
                      <p className="text-black dark:text-white font-medium text-sm">
                        No Blogs to show!
                      </p>
                    </div>
                  </div>
                </div>
              </TabPanel> */}

              {/* Teams */}
              <TabPanel
                value={"0"}
                sx={{
                  padding: "10px !important",
                }}
                className={classNames("rounded-xl w-full h-full")}
              >
                <hr className="h-px mb-4 bg-charcoal border-0" />
                <div className="flex space-x-1 sm:space-x-3">
                  <div className="flex-grow">
                    <Input
                      className="rounded-lg h-[42px] text-xs"
                      icon={darkMode ? searchIconDark : searchIconLight}
                      placeholder="Search Teams"
                      value={teamKeyword}
                      onChange={(e) => setTeamKeyword(e.target.value)}
                    />
                  </div>
                  <div className="">
                    {isAdmin && (
                      <button
                        onClick={handleCreateTeam}
                        className="float-right lg:w-32 h-10 bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-xs sm:text-sm font-bold w-[100px]"
                      >
                        Create Team
                      </button>
                    )}
                  </div>
                </div>
                {/* <div className="grid sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-10 sm:space-x-0 md:space-x-3">
                  <div className="md:col-span-5 lg:col-span-9 mb-3 md:mb-0 lg:mb-0">
                    <Input
                      className="rounded-lg h-[42px] text-xs"
                      icon={darkMode ? searchIconDark : searchIconLight}
                      placeholder="Search Teams"
                      value={teamKeyword}
                      onChange={(e) => setTeamKeyword(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:col-end-7 lg:col-end-11">
                    {isAdmin && (
                      <button
                        onClick={handleCreateTeam}
                        className="float-right sm:w-full lg:w-32 h-10 bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold"
                      >
                        Create Team
                      </button>
                    )}
                  </div>
                </div> */}

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
                    </div>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-xl sm:text-2xl text-black dark:text-white w-full text-center mt-5">
                      No Teams to show!
                    </p>
                  </div>
                )}
                <TeamModal />
              </TabPanel>

              {/* Matches */}
              <TabPanel
                value={"1"}
                sx={{
                  padding: "10px !important",
                }}
                className={classNames("rounded-xl w-full h-full")}
              >
                <hr className="h-px mb-4 bg-charcoal border-0" />
                {/* <div className="flex justify-end"> */}
                <div className="flex space-x-3">
                  <div className="flex-grow">
                    <Input
                      className="rounded-lg h-[42px] text-xs"
                      icon={darkMode ? searchIconDark : searchIconLight}
                      placeholder="Search Matches"
                      value={matchKeyword}
                      onChange={(e) => setMatchKeyword(e.target.value)}
                    />
                  </div>
                  <div className="">
                    {isAdmin && (
                      <button
                        onClick={handleCreateMatch}
                        className="float-right lg:w-32 h-10 bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-xs sm:text-sm font-bold w-[100px]"
                      >
                        Create Match
                      </button>
                    )}
                  </div>
                </div>
                {matches.length > 0 ? (
                  <MatchTable
                    matches={matches}
                    keyword={matchKeyword}
                  ></MatchTable>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-xl sm:text-2xl text-black dark:text-white w-full text-center mt-5">
                      No Matches to show!
                    </p>
                  </div>
                )}
                <MatchModal />
              </TabPanel>

              {/* Standings */}
              <TabPanel
                value={"2"}
                sx={{
                  padding: "10px !important",
                }}
                className={classNames(
                  "rounded-xl justify-between w-full h-full"
                )}
              >
                <hr className="h-px mb-4 bg-charcoal border-0" />
                <div className="flex space-x-3">
                  <Input
                    className="rounded-lg flex-grow text-xs"
                    icon={darkMode ? searchIconDark : searchIconLight}
                    placeholder="Search Standings"
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
                {
                  // .filter((team) =>
                  //   team.name
                  //     .toLowerCase()
                  //     .includes(standingsKeyword.toLowerCase())
                  // )
                  teams.length > 0 ? (
                    <StandingTable
                      // teams={teams.filter((team) =>
                      //   team.name
                      //     .toLowerCase()
                      //     .includes(standingsKeyword.toLowerCase())
                      // )}
                      teams={teams}
                      keyword={standingsKeyword}
                    ></StandingTable>
                  ) : (
                    <div className="flex items-center flex-grow">
                      <p className="text-xl sm:text-2xl text-black dark:text-white w-full text-center mt-5">
                        No Standings to show!
                      </p>
                    </div>
                  )
                }
              </TabPanel>

              {/* Players */}
              <TabPanel
                value={"3"}
                sx={{
                  padding: "10px !important",
                }}
                className={classNames("rounded-xl w-full h-full")}
              >
                <hr className="h-px mb-4 bg-charcoal border-0" />
                <div className="flex space-x-3">
                  <Input
                    className="rounded-lg flex-grow text-xs"
                    icon={darkMode ? searchIconDark : searchIconLight}
                    placeholder="Search Players"
                    value={playerKeyword}
                    onChange={(e) => {
                      setPlayerKeyword(e.target.value);
                    }}
                  />
                </div>
                {allPlayers.length > 0 ? (
                  <PlayerTable
                    players={allPlayers}
                    league={league}
                    playerKeyword={playerKeyword}
                  ></PlayerTable>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-xl sm:text-2xl text-black dark:text-white w-full text-center mt-5">
                      No Players To Show!
                    </p>
                  </div>
                )}
              </TabPanel>

              {/* Admissions */}
              {isAdmin && (
                <TabPanel
                  value={"4"}
                  sx={{
                    padding: "10px !important",
                  }}
                  className={classNames(
                    "rounded-xl justify-between w-full h-full"
                  )}
                >
                  <hr className="h-px mb-4 bg-charcoal border-0" />
                  <div className="h-full ">
                    <div className="border border-dark-gray flex flex-col h-full min-h-[420px] p-default rounded-main">
                      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 w-full justify-between space-y-5 md:space-y-0 lg:space-y-0">
                        <div className="flex flex-grow space-x-3 md:col-span-4 lg:col-span-6">
                          <Input
                            className="flex flex-grow rounded-lg h-[38px] bg-transparent text-xs"
                            icon={darkMode ? searchIconDark : searchIconLight}
                            placeholder="Search"
                            value={waitListKeyword}
                            onChange={(e) => {
                              setWaitListKeyword(e.target.value);
                            }}
                          />
                          <Select
                            className="h-[40px] w-[144px] rounded-lg text-xs"
                            options={rosterOptions}
                            handleClick={(e) => setRosterValue(e.name)}
                            value={rosterValue}
                          >
                            {rosterValue}
                          </Select>
                        </div>
                        <div className="md:ml-2 col-span-1">
                          <button
                            onClick={handleInvitePlayer}
                            className="w-full lg:col-span-1 h-10 bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold float-right "
                          >
                            Invite Player
                          </button>
                        </div>
                      </div>
                      <div className="overflow-y-scroll:auto h-4/6 flex flex-col flex-grow rounded-default">
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
                            // rosterList={rosterValue}
                            rosterValue={rosterValue}
                            setRosterValue={setRosterValue}
                          />
                        ) : (
                          <div className="flex items-center flex-grow">
                            <p className="text-2xl text-black dark:text-white w-full text-center">
                              {rosterValue === "Waitlisted"
                                ? "No Waitlist to show!"
                                : "Now Accepted to show!"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <InvitePlayerModal></InvitePlayerModal>
                </TabPanel>
              )}
              {/* Settings */}
              <TabPanel
                value={isAdmin ? "5" : "4"}
                sx={{
                  padding: "10px !important",
                }}
                className={classNames("rounded-xl w-full h-full")}
              >
                <hr className="h-px mb-4 bg-charcoal border-0" />
                <div className="mt-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4">
                  {/* League Settings */}

                  <div className="flex flex-col border border-dark-gray rounded p-7">
                    <div>
                      <h1 className="dark:text-white text-black font-medium mb-4">
                        Edit League
                      </h1>
                      <div className="grid grid-cols-6 gap-2 sm:gap-4 mb-6 items-end">
                        <div>
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
                            className="rounded-md cursor-pointer w-8 h-8 sm:w-12 sm:h-12"
                            alt=""
                          />
                        </div>
                        <div className="col-span-5">
                          <p className="dark:text-white text-black text-sm sm:text-base">
                            League Name
                          </p>
                          <Input
                            className="rounded-default flex-grow text-sm sm:text-base"
                            placeholder="League Name"
                            value={leagueName}
                            onChange={(e) => setLeagueName(e.target.value)}
                          ></Input>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="dark:text-white text-black text-sm sm:text-base">
                          League Description
                        </p>
                        <textarea
                          id="message"
                          rows="6"
                          className="block p-2.5 w-full text-sm sm:text-base text-gray-900 rounded-lg border border-charcoal focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-charcoal dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none outline-none"
                          placeholder="Describe your League*"
                          value={leagueDescription}
                          onChange={(e) => setLeagueDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-6 grid grid-cols-2 gap-2">
                        <span>
                          <p className="dark:text-white text-black text-sm sm:text-base">
                            Start Date
                          </p>
                          <DatePicker
                            className="text-xs h-12 rounded px-3 py-2 w-full"
                            date={leagueStartDate}
                            setDate={setLeagueStartDate}
                          ></DatePicker>
                        </span>
                        <span>
                          <p className="dark:text-white text-black text-sm sm:text-base">End Date</p>
                          <DatePicker
                            className="text-xs h-12 rounded px-3 py-2 w-full"
                            date={leagueEndDate}
                            setDate={setLeagueEndDate}
                          ></DatePicker>
                        </span>
                      </div>
                      <div className="mb-6 grid grid-cols-2 gap-2">
                        <span>
                          <p className="dark:text-white text-black text-sm sm:text-base">Period</p>
                          <Input
                            className="rounded-default flex-grow text-sm sm:text-base"
                            placeholder="League Name"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            type="number"
                          ></Input>
                        </span>
                        <span >
                          <p className="dark:text-white text-black text-sm sm:text-base">Time</p>
                          <TimerInput
                            initialTime={time}
                            setTime={setTime}
                            className="w-full bg-[#303335] rounded-default"
                          ></TimerInput>
                        </span>
                      </div>
                    </div>
                    {isAdmin && (
                      <>
                        <div className="grid grid-cols-2 gap-2 ">
                          <button
                            onClick={editLeague}
                            className="bg-blue-700 h-10 text-white font-bold text-sm rounded-default hover:bg-blue-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={deleteLeague}
                            className="bg-red-700 h-10 text-white font-bold text-sm rounded-default hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                        {(player?.isWaitList || player?.isAcceptedList) && (
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <button
                              onClick={leaveLeague}
                              className="bg-yellow-700 h-10 text-white font-bold text-sm rounded-default hover:bg-red-600 col-span-2"
                            >
                              Leave
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    {!isAdmin && (
                      <div className="grid grid-cols-2 gap-2 ">
                        <button
                          onClick={leaveLeague}
                          className="bg-yellow-700 h-10 text-white font-bold text-sm rounded-default hover:bg-red-600 col-span-2"
                        >
                          Leave
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Admin Access */}
                  {isAdmin && (
                    <div className="flex flex-col  space-y-3 border border-dark-gray rounded pt-5 p-7 ">
                      <div className="grid grid-cols-2 items-baseline mb-6">
                        <h1 className="dark:text-white text-black font-medium">
                          Admin Access
                        </h1>
                        <button
                          onClick={inviteAdmin}
                          className="bg-blue-700 h-10 w-15 float-right text-white font-bold text-sm rounded-default hover:bg-blue-600"
                        >
                          Invite Admin
                        </button>
                      </div>
                      <AdminTable user={user} leagueId={leagueId} />
                    </div>
                  )}
                  <AdminModal user={user} leagueId={leagueId} />
                  <LeaguePassowrdModal />
                  {/* Stats */}
                  {isAdmin && (
                    <div className="flex flex-col space-y-3 border border-dark-gray rounded p-5">
                      <table className="table-fixed">
                        <thead>
                          <tr>
                            <th className="dark:text-white text-black">
                              Action
                            </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className=" text-xs dark:text-white text-black">
                              Allow Fan view
                            </td>
                            <td>
                              <img
                                src={isAllowedFan ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleFan}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap text-xs dark:text-white text-black">
                              Require Password to Apply
                            </td>
                            <td>
                              <img
                                src={requirePassword ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={togglePassword}
                              />
                            </td>
                          </tr>
                          {requirePassword && (
                            <tr>
                              <td className="whitespace-nowrap text-xs dark:text-white text-black">
                                Password
                              </td>
                              <td className="text-xs dark:text-white text-black">
                                {league?.password}
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display Substitutues
                            </td>
                            <td>
                              <img
                                src={displaySubstitutes ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleSubstitutes}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display Position
                            </td>
                            <td>
                              <img
                                src={displayPosition ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={togglePosition}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display Jersey Number
                            </td>
                            <td>
                              <img
                                src={displayJerseyNumber ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleJerseyNumber}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display 3PA
                            </td>
                            <td>
                              <img
                                src={displayAttempts3 ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleAttempts3}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display FGA
                            </td>
                            <td>
                              <img
                                src={displayAttempts2 ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleAttempts2}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display FTA
                            </td>
                            <td>
                              <img
                                src={displayAttempts1 ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleAttempts1}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display Blocks
                            </td>
                            <td>
                              <img
                                src={displayBlocks ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleBlocks}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display Rebounds
                            </td>
                            <td>
                              <img
                                src={displayRebounds ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleRebounds}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display Assists
                            </td>
                            <td>
                              <img
                                src={displayAssists ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleAssists}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display Fouls
                            </td>
                            <td>
                              <img
                                src={displayFouls ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleFouls}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display Steals
                            </td>
                            <td>
                              <img
                                src={displaySteals ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleSteals}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="text-xs dark:text-white text-black">
                              Display Turnovers
                            </td>
                            <td>
                              <img
                                src={displayTurnovers ? toggleOn : toggleOff}
                                alt=""
                                className="w-8 cursor-pointer m-auto"
                                onClick={toggleTurnovers}
                              />
                            </td>
                          </tr>
                          {/*<tr>
                              <td>Display League ID</td>
                              <td>
                                <img
                                    src={displayLeagueId ? toggleOn : toggleOff}
                                    alt=""
                                    className="w-8 cursor-pointer"
                                    onClick={toggleLeagueId}
                                />
                              </td>
                            </tr>*/}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </TabPanel>
            </div>
          </TabContext>
        </div>
      </div>

      <LeagueModal />
    </div>
  );
};

export default League;
