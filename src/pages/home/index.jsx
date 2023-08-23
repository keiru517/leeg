import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import search from "../../assets/img/dark_mode/search.png";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import * as actions from "../../actions";

const Home = () => {
  const leagues = useSelector((state) => state.home.leagues);
  //   const leagues = [
  //     {'id': 1, 'logo': logo, 'name': '2023 TABC Summer League', 'start_date': 'Firday, July 2023', 'end_date': 'N/A', 'description': 'introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.'},
  //     {'id': 2, 'logo': logo, 'name': '2024 TABC Winter League', 'start_date': 'Firday, July 2023', 'end_date': 'N/A', 'description': 'introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.'}
  //   ];

  const options = [{id:0, name: "Ascend"}, {id:1, name:"Descend"}, {id:2, name:"Recent"}];
  const [value, setValue] = useState("Sort by");


  useEffect(() => {
    // getLeagues();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <PageTitle
        createAction={actions.OPEN_CREATE_LEAGUE_DIALOG}
        button="Create League"
      >
        My Leagues
      </PageTitle>
      <div className="flex flex-col flex-grow rounded-main bg-slate overflow-auto mt-[20px] p-default">
        <div className="search flex justify-between space-x-3">
          <Input
            icon={search}
            className="flex-grow rounded-lg text-xs"
            placeholder="Search Leagues"
          />
          <Select
            className="w-[144px] rounded-lg text-xs"
            options={options}
            handleClick={(e) => setValue(options[e].name)}
            value={value}
          >
            {value}
          </Select>
        </div>
        <br></br>
        {leagues.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leagues.map((lg, idx) => (
              <Card route="league" item={lg} key={idx} />
            ))}
          </div>
        ) : (
          <div className="dark:text-white text-2xl flex items-center flex-grow justify-center">
            <p>No Leagues to show!</p>
          </div>
        )}{" "}
      </div>
      <Modal />
    </div>
    // </div>
  );
};

export default Home;
