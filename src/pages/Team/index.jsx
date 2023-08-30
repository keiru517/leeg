import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import search from "../../assets/img/dark_mode/search.png";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import Input from "../../components/Input";
import Select from "../../components/Select";
import PageTitle from "../../components/PageTitle";
import { Tab } from "@headlessui/react";
import MatchTable from "../../components/Table/Match";
import TeamStatisticsTable from "../../components/Table/TeamStatistics";
import PlayerStatisticsTable from "../../components/Table/PlayerStatistics";
import TeamTable from "../../components/Table/Team";

const Team = () => {
  let { leagueId, id } = useParams();
  const dispatch = useDispatch();

  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == id
  );

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  // const teams = useSelector((state) => state.home.teams);

  const options = ["Ascend", "Descend", "Recent"];
  const [value, setValue] = useState("Sort by");

  const categories = ["Matches", "Statistics", "Players"];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const matches = useSelector((state) => state.home.matches).filter(
    (match) =>
      (match.leagueId == leagueId) &
      ((match.homeTeamId == id) | (match.awayTeamId == id))
  );

  const players = useSelector(state=>state.home.players).filter(player=>player.teamId==id)

  return (
    <div className="flex flex-col flex-grow">
      <PageTitle backIcon={leftarrowIcon} logo={team.logo}>
        {team.name}
      </PageTitle>
      <p className="font-dark-gray my-[20px]">
        <Link to="/">
          <span className="underline">My Leagues</span>
        </Link>
        <span className="text-sky-500"> &gt; </span>
        <span className="underline">{league.name}</span>
        <span className="text-sky-500"> &gt; </span>
        <Link to={`/league/${league.id}`}>
          <span className="underline">Teams</span>
        </Link>
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
                      matches={matches}
                      leagueId={leagueId}
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
                {players.length > 0 ? (
                  <>
                    <hr className="h-px my-4 bg-charcoal border-0" />
                    <div className=" flex flex-col space-y-5">
                      <p className="text-white text-sm font-mediim">
                        Team Statistics
                      </p>
                      <TeamStatisticsTable />
                      <p className="text-white text-sm font-mediim">
                        Player Statistics
                      </p>
                      <Input
                        className="rounded-lg text-xs"
                        icon={search}
                        placeholder="Search Schedules"
                      />
                      <PlayerStatisticsTable
                        players={players}
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
                {players.length > 0 ? (
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
                      No Players To Show!
                    </p>
                  </div>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      {/* <LeagueModal /> */}
    </div>
  );
};

export default Team;
