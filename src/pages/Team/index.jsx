import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import MatchModal from "../../components/Modal/MatchModal";
import Input from "../../components/Input";
import searchIconDark from "../../assets/img/dark_mode/search-icon-dark.svg";
import searchIconLight from "../../assets/img/dark_mode/search-icon-light.svg";
import backIconDark from "../../assets/img/dark_mode/back-icon-dark.png";
import backIconLight from "../../assets/img/dark_mode/back-icon-light.png";
import MatchTable from "../../components/Table/Match";
import TeamStatisticsTable from "../../components/Table/TeamStatistics";
import TeamPlayerStatisticsTable from "../../components/Table/TeamPlayerStatistics";
import * as actions from "../../actions";
import editIconDark from "../../assets/img/dark_mode/edit-icon-dark.png";
import editIconLight from "../../assets/img/dark_mode/edit-icon-light.png";

const Team = () => {
  let { leagueId, teamId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.home.dark_mode);

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const user = useSelector((state) => state.home.user);

  const admins = useSelector((state) => state.home.admins).filter(
    (admin) => admin.leagueId == league?.id && admin.isDeleted !== 1
  );

  const isAdmin =
    admins.some((admin) => admin.userId == user?.id) ||
    league?.userId == user?.id;

  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );

  const options = ["Ascend", "Descend", "Recent"];
  const [value, setValue] = useState("Sort by");
  const [keyword, setKeyword] = useState("");

  const categories = ["Matches", "Statistics", "Players"];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const matches = useSelector((state) => state.home.matches).filter(
    (match) =>
      match.leagueId == leagueId &&
      (match.homeTeamId == teamId || match.awayTeamId == teamId) &&
      !match.isNew
  );

  const players = useSelector((state) => state.home.players).filter(
    (player) => player?.teamId == teamId && player?.isDeleted !== 1
  );

  const matchups = useSelector((state) => state.home.matchups).filter(
    (matchup) => matchup.teamId == teamId
  );

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getUsers(dispatch);
    actions.getLeagues(dispatch);
    actions.getMatches(dispatch);
    actions.getTeams(dispatch);
    actions.getMatchups(dispatch);
    actions.getPlayers(dispatch);
  }, []);

  const handleEdit = () => {
    dispatch({ type: actions.OPEN_EDIT_TEAM_DIALOG, payload: team });
  };

  return (
    <div className="flex flex-col flex-grow">
      <p className="font-dark-gray my-3">
        <Link to="/">
          <span className="">My Leagues</span>
        </Link>
        <span className=""> &gt; </span>
        <Link to={`/league/${league?.id}?tab=0`}>
          <span className="">{league?.name}</span>
        </Link>
        <span className=""> &gt; </span>
        <Link to={`/league/${league?.id}?tab=1`}>
          <span className="">Teams</span>
        </Link>
        <span className="text-sky-500"> &gt; {team?.name}</span>
      </p>
      <div className="flex flex-col rounded-main bg-white dark:bg-slate flex-grow p-default">
        <div className="page-title bg-white dark:bg-charcoal flex items-center justify-between p-3">
          <div className="flex items-center">
            <div
              className="w-6 h-6 sm:w-[34px] sm:h-[34px] bg-gray-300 dark:bg-primary items-center flex justify-center rounded-default cursor-pointer hover:opacity-70"
              onClick={() => navigate(-1)}
            >
              <img
                src={darkMode ? backIconDark : backIconLight}
                alt=""
                className="w-[4px] h-[10px] dark:hover:bg-middle-gray rounded-default cursor-pointer"
              />
            </div>

            <img
              src={team?.logo}
              alt=""
              className="w-10 h-10 sm:w-20 sm:h-20 ml-6 rounded-full border border-gray-500"
            />

            <div className="text-2xl sm:text-3xl dark:text-white ml-6 font-bold">
              {team?.name}
            </div>
            {isAdmin && (
              <img
                src={darkMode ? editIconDark : editIconLight}
                className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer ml-3 mt-2"
                onClick={handleEdit}
              ></img>
            )}
          </div>
        </div>
        <div className="w-full px-2 sm:px-0 h-full flex flex-col flex-grow mt-3">
          <Tab.Group>
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
                        : " rounded-lg hover:bg-white/[0.12]"
                    )
                  }
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
                <hr className="h-px mt-4 bg-charcoal border-0" />
                <div className="flex justify-between">
                  {/* <Input
                    icon={darkMode?searchIconDark:searchIconLight}
                    className="flex-grow rounded-lg text-xs h-[42px]"
                    placeholder="Search Leagues"
                  /> */}
                  {/* <Select
                    className="w-[144px] rounded-lg text-xs"
                    options={options}
                    handleClick={(e) => setValue(e)}
                    value={value}
                  >
                    {value}
                  </Select> */}
                </div>
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
                    <hr className="h-px mt-4 bg-charcoal border-0" />
                    <div className="flex flex-col space-y-5">
                      <TeamStatisticsTable matches={matches}/>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center flex-grow">
                    <p className="text-2xl text-black dark:text-white w-full text-center">
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
                <>
                  <hr className="h-px my-4 bg-charcoal border-0" />
                  <div className=" flex flex-col">
                    <Input
                      className="rounded-lg text-xs"
                      icon={darkMode ? searchIconDark : searchIconLight}
                      placeholder="Search Schedules"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    {players.filter((player) =>
                      (player.firstName + player.lastName)
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
                    ).length > 0 ? (
                      <div className="flex flex-grow items-center">
                        <TeamPlayerStatisticsTable
                          players={players.filter((player) =>
                            (player.firstName + player.lastName)
                              .toLowerCase()
                              .includes(keyword.toLowerCase())
                          )}
                          matchups={matchups}
                        ></TeamPlayerStatisticsTable>
                      </div>
                    ) : (
                      <div className="flex items-center flex-grow">
                        <p className="text-2xl text-black dark:text-white w-full text-center">
                          No Players To Show!
                        </p>
                      </div>
                    )}
                  </div>
                </>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <MatchModal />
    </div>
  );
};

export default Team;
