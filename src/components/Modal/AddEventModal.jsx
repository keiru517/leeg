import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import { Tab } from "@headlessui/react";
import close from "../../assets/img/dark_mode/close.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import apis from "../../utils/apis";
import rightArrowIcon from "../../assets/img/dark_mode/right-arrow.svg";
import EventPlayerList from "../ListItem/EventPlayerList";

const AddEventModal = (props) => {
  const { logs, setLogs, homeTeam, awayTeam } = props;
  let { leagueId, matchId } = useParams();

  const logId = useSelector((state) => state.home.event_dialog.logId);
  const log = Object.values(logs).find((log) => log.id == logId);

  const [playerId, setPlayerId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [period, setPeriod] = useState("");
  const [time, setTime] = useState("");
  const [event, setEvent] = useState("");

  const matchups = useSelector((state) => state.home.matchups).filter(
    (matchup) => matchup.matchId == matchId
  );

  const [filteredHomeTeamMatchups, setFilteredHomeTeamMatchups] = useState([]);
  const [filteredAwayTeamMatchups, setFilteredAwayTeamMatchups] = useState([]);

  useEffect(() => {
    setFilteredHomeTeamMatchups(
      matchups.filter((matchup) => matchup.teamId == homeTeam.id)
    );
    setFilteredAwayTeamMatchups(
      matchups.filter((matchup) => matchup.teamId == awayTeam.id)
    );
  }, []);

  useEffect(() => {
    setFilteredHomeTeamMatchups(
      matchups.filter((matchup) => matchup.teamId == homeTeam.id)
    );
    setFilteredAwayTeamMatchups(
      matchups.filter((matchup) => matchup.teamId == awayTeam.id)
    );
    setPlayerId(log?.playerId);
    setTeamId(log?.teamId);
    setPeriod(log?.period);
    setTime(log?.time);
    setEvent(log?.event);
  }, [logId]);

  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.home.event_dialog.open);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const clickAction = (id) => {
    console.log("you clicked", id);
  };

  const createSubmit = () => {
    console.log(playerId, teamId, period, time, event);
    let temp = {...logs};
    Object.values(temp).map((log, id)=>{
      if (log.id == logId) {
        temp[id] = {...temp[id], playerId, teamId, period, time, event};
      }
    });

    // console.log(temp)
    setLogs(temp);
    dispatch({type: actions.CLOSE_EDIT_EVENT_DIALOG})
    // dispatch({ type: actions.CLOSE_ADD_SUBSTITUTE_DIALOG });
    // axios
    //   .post(apis.createOneMatchup, {
    //     email,
    //     leagueId,
    //     matchId,
    //     teamId,
    //     jerseyNumber,
    //     position,
    //   })
    //   .then((res) => {
    //     actions.getPlayers(dispatch);
    //     actions.getTeams(dispatch);
    //     actions.getMatches(dispatch);
    //     actions.getMatchups(dispatch);
    //   })
    //   .catch((error) => console.log(error.response.data.message));
  };

  const closeDialog = () => {
    // dispatch({ type: actions.OPEN_CREATE_TEAM_DIALOG, payload: false });
    dispatch({ type: actions.CLOSE_EDIT_EVENT_DIALOG });
  };
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-slate h-[800px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <p className="text-2xl text-white font-bold">Edit Event</p>
                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col p-default justify-between">
                    <div className="space-y-6">
                      <div>
                        <p className="text-black dark:text-white font-bold text-base">
                          Event Time
                        </p>
                        <div className="flex space-x-3 mt-[10px]">
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              period === 1 ? "bg-success" : "bg-[#303335]"
                            } w-16 h-10 cursor-pointer hover:opacity-75`}
                            onClick={() => setPeriod(1)}
                          >
                            <p className="text-white">P1</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              period === 2 ? "bg-success" : "bg-[#303335]"
                            } w-16 h-10 cursor-pointer hover:opacity-75`}
                            onClick={() => setPeriod(2)}
                          >
                            <p className="text-white">P2</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              period === 3 ? "bg-success" : "bg-[#303335]"
                            } w-16 h-10 cursor-pointer hover:opacity-75`}
                            onClick={() => setPeriod(3)}
                          >
                            <p className="text-white">P3</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              period === 4 ? "bg-success" : "bg-[#303335]"
                            } w-16 h-10 cursor-pointer hover:opacity-75`}
                            onClick={() => setPeriod(4)}
                          >
                            <p className="text-white">P4</p>
                          </div>
                          <div className="flex items-center justify-center rounded-[10px] w-16 h-10 cursor-pointer hover:bg-opacity-70">
                            <img
                              src={rightArrowIcon}
                              alt=""
                              className="w-[14px] h-[21px]"
                            />
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] bg-[#303335] w-[141px] h-button cursor-pointer`}
                          >
                            {/* <p className="font-semibold text-[32px] text-black dark:text-white">
                              35:12
                            </p> */}
                            <input
                              type="text"
                              className="w-[100px] bg-transparent text-white text-xl"
                              value={time}
                              onChange={(e)=>setTime(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-black dark:text-white font-bold text-base">
                          Event Time
                        </p>
                        <div className="flex space-x-5 mt-[10px]">
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "+3 Pointer"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("+3 Pointer")}
                          >
                            <p className="text-white">+3</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "+2 Pointer"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("+2 Pointer")}
                          >
                            <p className="text-white">+2</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "+1 Pointer"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("+1 Pointer")}
                          >
                            <p className="text-white">+1</p>
                          </div>
                        </div>
                        <div className="flex space-x-5 mt-[10px]">
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "3 Missed"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("3 Missed")}
                          >
                            <p className="text-white">Missed 3</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "2 Missed"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("2 Missed")}
                          >
                            <p className="text-white">Missed 2</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "1 Missed"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("1 Missed")}
                          >
                            <p className="text-white">Missed 1</p>
                          </div>
                        </div>
                        <div className="flex space-x-5 mt-[10px]">
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "Rebound"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("Rebound")}
                          >
                            <p className="text-white">RBOUND</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "Timeout"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("Timeout")}
                          >
                            <p className="text-white">TIMEOUT</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "Turnover"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("Turnover")}
                          >
                            <p className="text-white">TURNOVER</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "Foul" ? "bg-primary" : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("Foul")}
                          >
                            <p className="text-white">FOUL</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "Block" ? "bg-primary" : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("Block")}
                          >
                            <p className="text-white">BLOCK</p>
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "Assist" ? "bg-primary" : "bg-[#303335]"
                            } w-full h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("Assist")}
                          >
                            <p className="text-white">ASSIST</p>
                          </div>
                        </div>
                      </div>

                      <div className="overflow-y-auto h-60">
                        <Tab.Group defaultIndex={0}>
                          <div className="flex justify-between">
                            <Tab.List className="flex justify-start space-x-5 rounded-xl bg-transparent p-1 ">
                              <Tab
                                key={0}
                                className={({ selected }) =>
                                  classNames(
                                    "py-2.5 text-sm font-medium leading-5 text-gray-500 dark:text-gray-300 px-3",
                                    " focus:outline-none ",
                                    selected
                                      ? "divide-[bg-sky-500] text-black dark:text-white border-b-2 border-sky-500"
                                      : " rounded-lg hover:bg-white/[0.12] "
                                  )
                                }
                                // onClick={() => handleCategory(idx)}
                              >
                                <div className="flex items-center">
                                  <img
                                    src={homeTeam?.logo}
                                    alt=""
                                    className="w-8 h-8 mr-3 rounded-full"
                                  />
                                  {homeTeam?.name}
                                </div>
                              </Tab>
                              <Tab
                                key={1}
                                className={({ selected }) =>
                                  classNames(
                                    "py-2.5 text-sm font-medium leading-5 text-gray-500 dark:text-gray-300 px-3",
                                    " focus:outline-none ",
                                    selected
                                      ? "divide-[bg-sky-500] text-black dark:text-white border-b-2 border-sky-500"
                                      : " rounded-lg hover:bg-white/[0.12] "
                                  )
                                }
                                // onClick={() => handleCategory(idx)}
                              >
                                <div className="flex items-center">
                                  <img
                                    src={awayTeam?.logo}
                                    alt=""
                                    className="w-8 h-8 mr-3 rounded-full"
                                  />
                                  {awayTeam?.name}
                                </div>
                              </Tab>
                            </Tab.List>
                          </div>
                          <Tab.Panels className="flex flex-grow items-center">
                            <Tab.Panel
                              key={0}
                              className={classNames(
                                "rounded-xl flex flex-col justify-between w-full h-full"
                              )}
                            >
                              <div>
                                {filteredHomeTeamMatchups.map(
                                  ({ player }, idx) => (
                                    <EventPlayerList
                                      key={idx}
                                      className="mb-5"
                                      player={player}
                                      playerId={playerId}
                                      setPlayerId={setPlayerId}
                                      setTeamId={setTeamId}
                                    ></EventPlayerList>
                                  )
                                )}
                              </div>
                            </Tab.Panel>
                            <Tab.Panel
                              key={1}
                              className={classNames(
                                "rounded-xl flex flex-col justify-between w-full h-full"
                              )}
                            >
                              <div>
                                {filteredAwayTeamMatchups.map(
                                  ({ player }, idx) => (
                                    <EventPlayerList
                                      key={idx}
                                      className="mb-5"
                                      player={player}
                                      playerId={playerId}
                                      setPlayerId={setPlayerId}
                                      setTeamId={setTeamId}
                                      // teamId={awayTeam.id}
                                      // addAction={addAction}
                                    ></EventPlayerList>
                                  )
                                )}
                              </div>
                            </Tab.Panel>
                          </Tab.Panels>
                        </Tab.Group>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div>
                      <hr className="border border-gray-600 w-full" />
                      <div className="flex justify-between mt-5">
                        <button
                          onClick={createSubmit}
                          className={`bg-red-600 rounded-xl w-[147px] hover:bg-opacity-70 h-[53px] text-white disabled:opacity-10`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={createSubmit}
                          className={`bg-primary rounded-xl w-[231px] hover:bg-opacity-70 h-[53px ] text-white disabled:opacity-10`}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddEventModal;
