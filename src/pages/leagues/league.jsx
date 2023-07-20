import React, { useState, useEffect, Children } from "react";
import search from "../../assets/img/search.png";
import leftarrowIcon from "../../assets/img/left-arrow.png";
import mark from "../../assets/img/mark.png";
import editIcon from "../../assets/img/edit.png";
import deleteIcon from "../../assets/img/delete.png";
// import delete from '../../assets/img/delete.png';
import Input from "../../components/Input";
import ListItem from "../../components/ListItem";
import Select from "../../components/Select";
import Button from '../../components/Button';
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle/pageTitle";
import Table from "../../components/Table";
import { Tab } from "@headlessui/react";
import avatar from '../../assets/img/player.png';

const League = () => {
  const leagues = [1, 2, 3, 4, 5, 6];

  const options = ["Sort by", "Ascend", "Descend", "Recent"];

  const categories = ["Schedule", "Standings", "Teams", "Manage Rosters"];

  const columns = [
    "Date",
    "Location",
    "Time",
    "Home",
    "Away",
    "Results",
    "Action",
  ];

  const data = [
    {
      date: "Monday",
      location: "TABC New gym",
      time: "8:00PM",
      home: "Bucks",
      away: "Bucks",
      results: "41:62",
    },
    {
      date: "Monday",
      location: "TABC New gym",
      time: "8:00PM",
      home: "Bucks",
      away: "Bucks",
      results: "41:62",
    },
    {
      date: "Monday",
      location: "TABC New gym",
      time: "8:00PM",
      home: "Bucks",
      away: "Bucks",
      results: "41:62",
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [breadcrum, setBreadcrum] = useState("Schedule");

  const handleClick = (data) => {
    setBreadcrum(data);
  };

  const players = [
    {'name': 'Tornike Shengelia', 'email':'James@gmail.com', 'created_at': 'June 26, 2023, 10:00PM'},
    {'name': 'Tornike Shengelia', 'email':'James@gmail.com', 'created_at': 'June 26, 2023, 10:00PM'},
    {'name': 'Tornike Shengelia', 'email':'James@gmail.com', 'created_at': 'June 26, 2023, 10:00PM'},
    {'name': 'Tornike Shengelia', 'email':'James@gmail.com', 'created_at': 'June 26, 2023, 10:00PM'},
    {'name': 'Tornike Shengelia', 'email':'James@gmail.com', 'created_at': 'June 26, 2023, 10:00PM'},
    {'name': 'Tornike Shengelia', 'email':'James@gmail.com', 'created_at': 'June 26, 2023, 10:00PM'},
    {'name': 'Tornike Shengelia', 'email':'James@gmail.com', 'created_at': 'June 26, 2023, 10:00PM'},
    {'name': 'Tornike Shengelia', 'email':'James@gmail.com', 'created_at': 'June 26, 2023, 10:00PM'},
    {'name': 'Tornike Shengelia', 'email':'James@gmail.com', 'created_at': 'June 26, 2023, 10:00PM'},
    {'name': 'Tornike Shengelia', 'email':'James@gmail.com', 'created_at': 'June 26, 2023, 10:00PM'}
  ]


  return (
    <div className="flex flex-col flex-grow">
      <PageTitle
        backIcon={leftarrowIcon}
        logo={mark}
        editIcon={editIcon}
        deleteIcon={deleteIcon}
        button="Create Match"
      >
        2023 TABC Summer League
      </PageTitle>
      <p className="font-gray my-[20px]">
        2023 TABC Summer League
        <span className="text-sky-500"> &gt; {breadcrum}</span>
      </p>
      <div className="rounded-main bg-nav flex-grow p-[26px]">
        <div className="w-full px-2 sm:px-0 h-full flex flex-col">
          <Tab.Group>
            <Tab.List className="flex w-[483px] space-x-5 rounded-xl bg-transparent p-1 ">
              {categories.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-1/3 py-2.5 text-sm font-medium leading-5 text-gray-300",
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
            <hr className="h-px my-4 bg-default border-0" />
            <Tab.Panels className="flex-grow flex items-center ">
              <Tab.Panel
                key={0}
                className={classNames(
                  "rounded-xl flex flex-col justify-between w-full h-full"
                )}
                
              >
                <Input className='rounded-lg' icon={search} placeholder="Search Schedules" />
                {/* <Table columns={columns} data={data} icon={actionIcon}/> */}
                <div className="flex items-center flex-grow">
                  <p className="text-2xl text-white w-full text-center">
                    No Matches to show!
                  </p>
                </div>
              </Tab.Panel>
              <Tab.Panel
                key={1}
                className={classNames(
                  "rounded-xl flex flex-col justify-between w-full h-full"
                )}
                // onClick={handleClick("Standings")}
              >
                <Input className='rounded-lg' icon={search} placeholder="Search Schedules" />
                {/* <Table columns={columns} data={data} icon={actionIcon}/> */}
                <div className="flex items-center flex-grow">
                  <p className="text-2xl text-white w-full text-center">
                    No Standings to show!
                  </p>
                </div>
              </Tab.Panel>
              <Tab.Panel
                key={2}
                className={classNames(
                  "rounded-xl flex flex-col justify-between w-full h-full"
                )}
              >
                <Input className='rounded-lg' icon={search} placeholder="Search Schedules" />
                {/* <Table columns={columns} data={data} icon={actionIcon}/> */}
                <div className="flex items-center flex-grow">
                  <p className="text-2xl text-white w-full text-center">
                    No Teams to show!
                  </p>
                </div>
              </Tab.Panel>
              <Tab.Panel
                key={3}
                className={classNames(
                  "rounded-xl flex flex-col justify-between w-full h-full"
                )}
              >
                {/* <Table columns={columns} data={data} icon={actionIcon}/> */}
                <div className="flex items-center h-full space-x-4">
                  <div className="w-1/2 bg-default h-[420px] p-[26px] rounded-main">
                    <div className="flex justify-between w-full">
                      <p className="text-white text-xl font-semibold">Waitlisted Players</p>
                      <p className="text-white text-xl font-semibold">120</p>
                    </div>
                    <div className="flex w-full justify-between space-x-10 my-5">
                      <div className="flex flex-grow space-x-3 ">
                        <Input className='flex-grow rounded-lg h-[38px]' icon={search} placeholder="Search Players" />
                        <Select className='w-[144px] rounded-lg' options={options}/>
                      </div>
                      <div>
                        <Button className='text-sm bg-success w-18 h-[38px]'>Accept</Button>
                      </div>
                    </div>
                    <div className="overflow-y-scroll overflow-hidden h-4/6">
                      {
                        players.map(player=>(
                          <ListItem className='mb-5' avatar={avatar} name={player.name} email={player.email} date={player.created_at}></ListItem>

                        ))
                      }
                    </div>
                  </div>
                  <div className="w-1/2 bg-default h-[420px] p-[26px] rounded-main">
                    <div className="flex justify-between w-full">
                      <p className="text-white text-xl font-semibold">Accepted Players</p>
                      <p className="text-white text-xl font-semibold">120</p>
                    </div>
                    <div className="flex w-full justify-between space-x-10 my-5">
                      <div className="flex flex-grow space-x-3 ">
                        <Input className='flex-grow rounded-lg h-[38px]' icon={search} placeholder="Search Players" />
                        <Select className='w-[144px] rounded-lg' options={options}/>
                      </div>
                      <div>
                        <Button className='text-sm bg-danger w-18 h-[38px]'>Remove</Button>
                      </div>
                    </div>
                    <div className="overflow-y-scroll h-4/6">
                      {
                        players.map(player=>(
                          <ListItem className='mb-5' avatar={avatar} name={player.name} email={player.email} date={player.created_at}></ListItem>

                        ))
                      }
                    </div>
                  </div>

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
