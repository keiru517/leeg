import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "../../components/Card";
import search from "../../assets/img/dark_mode/search.png";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle/PageTitle";
import * as actions from "../../actions";
import apis from "../../utils/apis";
import logo from '../../assets/img/dark_mode/team-logo.png';

const Home = () => {
  const modal_status = useSelector((state) => state.home.league_dialog_open);
  const create_step = useSelector((state) => state.home.create_step);
  const leagues = useSelector((state) => state.home.leagues);
//   const leagues = [
//     {'id': 1, 'logo': logo, 'name': '2023 TABC Summer League', 'start_date': 'Firday, July 2023', 'end_date': 'N/A', 'description': 'introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.'},
//     {'id': 2, 'logo': logo, 'name': '2024 TABC Winter League', 'start_date': 'Firday, July 2023', 'end_date': 'N/A', 'description': 'introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.'}
//   ];

  const options = ["Ascend", "Descend", "Recent"];
  const [value, setValue] = useState("Sort by");

  const dispatch = useDispatch()
  // create a league
  const createLeague = () => {
    console.log("create_league");
  };

  // read leagues
  const getLeagues = () => {

    // axios.get(apis.read_leagues)
    // .then(res=>{
    //    get leagues from server
    const leagues = [
        {'id': 1, 'logo': logo, 'name': '2023 TABC Summer League', 'start_date': 'Firday, July 2023', 'end_date': 'N/A', 'description': 'introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.'},
        {'id': 2, 'logo': logo, 'name': '2024 TABC Winter League', 'start_date': 'Firday, July 2023', 'end_date': 'N/A', 'description': 'introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.'}
      ];
      dispatch({type: actions.GET_LEAGUES, payload: leagues})
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
    getLeagues();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <PageTitle action={actions.OPEN_CREATE_LEAGUE} button="Create League">
        My Leagues
      </PageTitle>
      <div className="flex flex-col flex-grow rounded-main bg-slate overflow-auto mt-[20px] p-default">
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
              <Card league={lg} key={idx} />
            ))}
          </div>
        ) : (
          <div className="dark:text-white text-2xl flex items-center flex-grow justify-center">
            <p>No Leagues to show!</p> 
          </div>
        )}{" "}
      </div>
      <Modal status={modal_status} create_step={create_step} />
    </div>
    // </div>
  );
};

export default Home;
