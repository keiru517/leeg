import React, { useState, useEffect, Children } from "react";
import League from "../../components/league";
import search from "../../assets/img/search.png";
import leftarrowIcon from "../../assets/img/left-arrow.png";
import mark from "../../assets/img/mark.png";
import editIcon from "../../assets/img/edit.png";
import deleteIcon from "../../assets/img/delete.png";
import actionIcon from "../../assets/img/action.png";
// import delete from '../../assets/img/delete.png';
import Input from "../../components/Input";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle/pageTitle";
import Table from "../../components/Table";
import { Tab } from "@headlessui/react";

const Schedule = () => {
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


  return (
    <div>
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
      <div className="body overflow-auto">
        <div className="w-full px-2 sm:px-0 h-full flex flex-col">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-transparent p-1">
              {categories.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm font-medium leading-5 text-gray-300",
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
            <Tab.Panels className="mt-2 flex-grow flex items-center ">
              <Tab.Panel
                key={0}
                className={classNames(
                  "rounded-xl p-3 flex flex-col justify-between w-full h-full"
                )}
                
              >
                <Input icon={search} placeholder="Search Schedules" />
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
                  "rounded-xl p-3 flex flex-col justify-between w-full h-full"
                )}
                // onClick={handleClick("Standings")}
              >
                <Input icon={search} placeholder="Search Schedules" />
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
                  "rounded-xl p-3 flex flex-col justify-between w-full h-full"
                )}
              >
                <Input icon={search} placeholder="Search Schedules" />
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
                  "rounded-xl p-3 flex flex-col justify-between w-full h-full"
                )}
              >
                <Input icon={search} placeholder="Search Schedules" />
                {/* <Table columns={columns} data={data} icon={actionIcon}/> */}
                <div className="flex items-center flex-grow">
                  <p className="text-2xl text-white w-full text-center">
                    roster page
                  </p>
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

export default Schedule;
