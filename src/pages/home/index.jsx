import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import search from "../../assets/img/dark_mode/search.png";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import * as actions from "../../actions";

const Home = () => {
  const leagues = useSelector((state) => state.home.leagues);
  const user = useSelector((state) => state.home.user);

  const filters = [
    { id: 0, name: "All Leagues" },
    { id: 1, name: "My Leagues" },
    { id: 2, name: "Other Leagues" },
  ];

  const options = [
    { id: 0, name: "Ascend" },
    { id: 1, name: "Descend" },
    { id: 2, name: "Recent" },
  ];

  const [filter, setFilter] = useState(filters[0]);
  const [value, setValue] = useState("Sort by");

  const dispatch = useDispatch();


  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    // actions.getCountries(dispatch);
    actions.getLeagues(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getPlayers(dispatch);
  }, []);


  // set initial values
  useEffect(() => {
    setFilteredData(leagues);
  }, [leagues]);

  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([])
  useEffect(()=>{
    const searchResult = leagues.filter(league=>league.name.toLowerCase().includes(keyword.toLowerCase()));
    setFilteredData(searchResult);
  },[keyword])
  

  return (
    <div className="flex flex-col flex-grow">
      <PageTitle
        createAction={actions.OPEN_CREATE_LEAGUE_DIALOG}
        button="Create League"
        setLeagues={setFilteredData}
      >
      </PageTitle>
      <div className="flex flex-col flex-grow rounded-main dark:bg-slate bg-white overflow-auto mt-[20px] p-default">
        <div className="search flex justify-between space-x-3">
          <Input
            icon={search}
            className="flex-grow rounded-lg text-xs"
            placeholder="Search Leagues"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Select
            className="w-[144px] rounded-lg text-xs"
            options={options}
            handleClick={(e) => setValue(e.name)}
            value={value}
          >
            {value}
          </Select>
        </div>
        <br></br>
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((lg, idx) => (
              <Card route="league" league={lg} key={idx} />
            ))}
          </div>
        ) : (
          <div className="dark:text-white text-charcoal text-2xl flex items-center flex-grow justify-center">
            <p className="font-bold text-lg">No Leagues to show!</p>
          </div>
        )}{" "}
      </div>
      <Modal />
    </div>
    // </div>
  );
};

export default Home;
