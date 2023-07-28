import React, { useState, useEffect, Children } from "react";
import search from "../../assets/img/dark_mode/search.png";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import logo from "../../assets/img/dark_mode/team-logo.png";
import editIcon from "../../assets/img/dark_mode/edit.png";
import deleteIcon from "../../assets/img/dark_mode/delete.png";
// import delete from '../../assets/img/delete.png';
import Input from "../../components/Input";
import ListItem from "../../components/ListItem";
import Select from "../../components/Select";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import ScheduleTable from '../../components/Table/Schedule';
import StandingsTable from '../../components/Table/Standings';
import TeamsTable from '../../components/Table/Teams';
import { Tab } from "@headlessui/react";
import avatar from "../../assets/img/dark_mode/player.png";
import edit from "../../assets/img/dark_mode/edit.png";
import userAdd from "../../assets/img/dark_mode/user-add.png";

const League = () => {
  const leagues = [1, 2, 3, 4, 5, 6];

  const options = ["Sort by", "Ascend", "Descend", "Recent"];

  const categories = ["Manage Rosters", "Teams", "Matches", "Standings", "All Playerlist"];

  const schedule_columns = [
    "Date",
    "Location",
    "Time",
    "Home",
    "Away",
    "Results",
    "Action",
  ];

  const standing_columns = [
    "Position",
    "Team",
    "W",
    "L",
    "Point Scored",
    "Point Against",
    "Diff",
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [breadcrum, setBreadcrum] = useState("Schedule");

  const handleClick = (data) => {
    setBreadcrum(data);
  };

  const schedules = [
    {
      date: "Monday June 19th",
      location: "TABC New gym",
      time: "8:00 PM",
      home: "Bucks",
      away: "Bucks",
      results: "41-62",
      logo: {logo}
    },
    {
      date: "Monday June 19th",
      location: "TABC New gym",
      time: "8:00 PM",
      home: "Bucks",
      away: "Bucks",
      results: "41-62",
    },
    {
      date: "Monday June 19th",
      location: "TABC New gym",
      time: "8:00 PM",
      home: "Bucks",
      away: "Bucks",
      results: "41-62",
    },
    {
      date: "Monday June 19th",
      location: "TABC New gym",
      time: "8:00 PM",
      home: "Bucks",
      away: "Bucks",
      results: "41-62",
    },
    {
      date: "Monday June 19th",
      location: "TABC New gym",
      time: "8:00 PM",
      home: "Bucks",
      away: "Bucks",
      results: "41-62",
    },
    {
      date: "Monday June 19th",
      location: "TABC New gym",
      time: "8:00 PM",
      home: "Bucks",
      away: "Bucks",
      results: "41-62",
    },
    {
      date: "Monday June 19th",
      location: "TABC New gym",
      time: "8:00 PM",
      home: "Bucks",
      away: "Bucks",
      results: "41-62",
    },
  ];

  // const schedules = [];

  const standings = [
    {team: 'Bucks', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'FC inter', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'AC Milan', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'Juventus', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'Real madrid', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'FC Barcelona', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'Rayo Vallecano', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'Fenerbahche', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'Fenerbahche', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'Fenerbahche', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'Fenerbahche', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'Fenerbahche', w:12, l:6, scored:167, against:142, diff:27},
    {team: 'Fenerbahche', w:12, l:6, scored:167, against:142, diff:27},
  ];
  
  const teams = [
    {
      name:'Bucks',
      status: '10/12',
      players: [
        {name: 'George Chichua', avatar: avatar},
        {name: 'George Chichua', avatar: avatar},
        {name: 'George Chichua', avatar: avatar},
        {name: 'George Chichua', avatar: avatar},
      ]
    },
    {
      name:'Real Madrid',
      status: '10/12',
      players: [
        {name: 'George Chichua', avatar: avatar},
        {name: 'George Chichua', avatar: avatar},
        {name: 'George Chichua', avatar: avatar},
        {name: 'George Chichua', avatar: avatar},
      ]
    },
    {
      name:'Real Madrid',
      status: '10/12',
      players: [
        {name: 'George Chichua', avatar: avatar},
        {name: 'George Chichua', avatar: avatar},
        {name: 'George Chichua', avatar: avatar},
        {name: 'George Chichua', avatar: avatar},
      ]
    },

  ];

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

  return (
    <div className="flex flex-col flex-grow">
      <PageTitle
        backIcon={leftarrowIcon}
        logo={logo}
        editIcon={editIcon}
        deleteIcon={deleteIcon}
        button="Create Match"
      >
        2023 TABC Summer League
      </PageTitle>
      <p className="font-dark-gray my-[20px]">
        2023 TABC Summer League
        <span className="text-sky-500"> &gt; {breadcrum}</span>
      </p>
      <div className="rounded-main bg-slate flex-grow p-default">
        <div className="w-full px-2 sm:px-0 h-full flex flex-col">
          <Tab.Group>
            <Tab.List className="flex justify-start space-x-5 rounded-xl bg-transparent p-1 ">
              {categories.map((category) => (
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
                  onClick={() => handleClick(category)}
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="flex-grow flex items-center ">
              {/* Rosters */}
              <Tab.Panel
                key={3}
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
                      <p className="text-white text-xl font-semibold">120</p>
                    </div>
                    <div className="flex w-full justify-between space-x-10 my-5">
                      <div className="flex flex-grow space-x-3 ">
                        <Input
                          className="flex-grow rounded-lg h-[38px] "
                          icon={search}
                          placeholder="Search Players"
                        />
                        <Select
                          className="w-[144px] rounded-lg"
                          options={options}
                        />
                      </div>
                      <div>
                        <Button className="text-sm bg-success w-18 h-[38px]">
                          Accept
                        </Button>
                      </div>
                    </div>
                    <div className="overflow-y-scroll overflow-hidden h-4/6">
                      {players.map((player, idx) => (
                        <ListItem
                        key={idx}
                          className="mb-5"
                          avatar={avatar}
                          name={player.name}
                          email={player.email}
                          date={player.created_at}
                        ></ListItem>
                      ))}
                    </div>
                  </div>
                  <div className="w-1/2 bg-charcoal h-[420px] p-default rounded-main">
                    <div className="flex justify-between w-full">
                      <p className="text-white text-xl font-semibold">
                        Accepted Players
                      </p>
                      <p className="text-white text-xl font-semibold">120</p>
                    </div>
                    <div className="flex w-full justify-between space-x-10 my-5">
                      <div className="flex flex-grow space-x-3 ">
                        <Input
                          className="flex-grow rounded-lg h-[38px]"
                          icon={search}
                          placeholder="Search Players"
                        />
                        <Select
                          className="w-[144px] rounded-lg"
                          options={options}
                        />
                      </div>
                      <div>
                        <Button className="text-sm bg-danger w-18 h-[38px]">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="overflow-y-scroll h-4/6">
                      {players.map((player) => (
                        <ListItem
                          className="mb-5"
                          avatar={avatar}
                          name={player.name}
                          email={player.email}
                          date={player.created_at}
                        ></ListItem>
                      ))}
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              {/* Schedule */}
              <Tab.Panel
                key={0}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                {schedules.length > 0 ? (
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
                      No Matches to show!
                    </p>
                  </div>
                )}
                <ScheduleTable columns={schedule_columns} data={schedules}/>
              </Tab.Panel>

              {/* Standings */}
              <Tab.Panel
                key={1}
                className={classNames(
                  "rounded-xl flex flex-col w-full h-full"
                )}
              >
                {standings.length > 0 ? (
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
                      No Standings to show!
                    </p>
                  </div>
                )}
                <StandingsTable columns={standing_columns} data={standings}/>
              </Tab.Panel>

              {/* Teams */}
              <Tab.Panel
                key={2}
                className={classNames(
                  "rounded-xl flex flex-col justify-between w-full h-full"
                )}
              >
                {teams.length > 0 ? (
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
                <div className="grid grid-cols-3 gap-4">

                  {
                    teams.map(team=>(
                      <div>
                        <div className="flex justify-between bg-charcoal h-[53px] mt-4 rounded-tl-lg rounded-tr-lg p-4">
                          <div className="flex items-center">
                            <img src={logo} alt="" />
                            <p className="text-sm text-white underline mx-2">{team.name}</p>
                            <p className="text-[10px] text-white">{team.status}</p>
                          </div>
                          <div className="flex">
                            <img src={userAdd} alt="" className="mr-2"/>
                            <img src={edit} alt="" />
                          </div>
                        </div>
                        <TeamsTable players={team.players}></TeamsTable>
                      </div>
                    ))
                  }
                </div>                
              </Tab.Panel>
              

            </Tab.Panels>
          </Tab.Group>
        </div>
        {/* <Modal /> */}
      </div>
    </div>
  );
};

export default League;
