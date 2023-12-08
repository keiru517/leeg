import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import searchIconDark from "../../assets/img/dark_mode/search-icon-dark.svg"
import searchIconLight from "../../assets/img/dark_mode/search-icon-light.svg"
import Input from "../../components/Input";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import * as actions from "../../actions";
import { useNavigate } from "react-router-dom";
import LeaguePasswordModal from "../../components/Modal/LeaguePasswordModal";

const Home = () => {
  const user = useSelector((state) => state.home.user);
  const darkMode = useSelector((state) => state.home.dark_mode);
  const leagues = useSelector((state) => state.home.leagues);

  const filters = [
    { id: 0, name: "All Leagues" },
    { id: 1, name: "My Leagues" },
    { id: 2, name: "Other Leagues" },
  ];

  const [filter, setFilter] = useState(filters[0].name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"), navigate);
    actions.getUsers(dispatch);
    actions.getLeagues(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getPlayers(dispatch);
    actions.getAdmins(dispatch);
  }, []);

  // // set initial values
  useEffect(() => {
    setFilteredData(leagues);
  }, [leagues]);

  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(leagues);
  useEffect(() => {
    const searchResult = leagues.filter((league) =>
      league.name.toLowerCase().includes(keyword.toLowerCase()) || league.id.toString().padStart(6, '0').includes(keyword.toLowerCase())
    );
    setFilteredData(searchResult);
  }, [keyword]);

  const handleFilter = (e) => {
    setFilter(e.name);
    if (e.id === 0) {
      setFilteredData(leagues);
    } else if (e.id === 1) {
      const myLeagues = leagues.filter((league) => league.userId == user?.id);
      setFilteredData(myLeagues);
    } else if (e.id === 2) {
      const otherLeagues = leagues.filter(
        (league) => league.userId !== user?.id
      );
      setFilteredData(otherLeagues);
    }
  };

  const handleClick = () => {
    dispatch({ type: actions.OPEN_CREATE_LEAGUE_DIALOG, payload: true });
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="block sm:hidden">
        <PageTitle
          createAction={actions.OPEN_CREATE_LEAGUE_DIALOG}
          button="Create League"
          setLeagues={setFilteredData}
        ></PageTitle>
      </div>
      <div className="flex flex-col flex-grow rounded-main dark:bg-slate bg-white overflow-auto p-default sm:mt-3">
        <div className="search flex justify-between space-x-3">
          <Input
            icon={darkMode?searchIconDark:searchIconLight}
            className="flex-grow rounded-lg text-xs h-[38px]"
            placeholder="Search Leagues"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Select
            className="w-[144px] rounded-lg text-xs hidden sm:inline h-[38px]"
            options={filters}
            handleClick={handleFilter}
            value={filter}
          >
            {filter}
          </Select>
          <div className="hidden sm:block">
            <button
              onClick={handleClick}
              className="w-[125px] h-button bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 font-bold text-sm"
            >
              Create League
            </button>
          </div>
        </div>
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
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
      <LeaguePasswordModal />
    </div>
    // </div>
  );
};

export default Home;
