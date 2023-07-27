import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "../../components/Card";
import search from "../../assets/img/dark_mode/search.png";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle/PageTitle";
import * as actions from "../../actions";
import apis from "../../utils/apis";

const Home = () => {
  const modal_status = useSelector((state) => state.leagues.league_dialog_open);
  const create_step = useSelector((state) => state.leagues.create_step);

  const leagues = [
    1
  ];

  const options = ["Ascend", "Descend", "Recent"];
  const [value, setValue] = useState("Sort by");

  // create a league
  const createLeague = () => {
    console.log("create_league");
  };

  // read leagues
  const readLeagues = () => {
    // axios.get(apis.read_leagues)
    // .then(res=>{
    //     console.log('response arrived')
    // })
    // console.log(apis.read_leagues)
  };

  // update a league
  const updateLeague = () => {
    console.log("update_league");
  };

  // delete a league
  const deleteLeague = () => {
    console.log("delete_league");
  };

  useEffect(() => {
    readLeagues();
  }, []);

  return (
    <div>
      <PageTitle action={actions.OPEN_CREATE_LEAGUE} button="Create League">
        My Leagues
      </PageTitle>
      <div className="rounded-main bg-slate overflow-auto mt-[20px] p-default">
        <div className="search flex justify-between space-x-3">
          <Input
            icon={search}
            className="flex-grow rounded-lg"
            placeholder="Search Leagues"
          />
          <Select
            className="w-[144px] rounded-lg"
            options={options}
            handleClick={(e) => setValue(e)}
            value={value}
          >
            {value}
          </Select>
        </div>
        <br></br>
        {leagues.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leagues.map((lg, idx) => (
              <Card key={idx} />
            ))}
          </div>
        ) : (
          <p className="dark:text-white text-2xl text-center">
            No Leagues to show!
          </p>
        )}{" "}
      </div>
      <Modal status={modal_status} create_step={create_step} />
    </div>
    // </div>
  );
};

export default Home;
