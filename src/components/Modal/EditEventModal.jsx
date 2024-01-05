import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import { Tab } from "@headlessui/react";
import close from "../../assets/img/dark_mode/close.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import rightArrowIcon from "../../assets/img/dark_mode/right-arrow.svg";
import EventPlayerList from "../ListItem/EventPlayerList";
import TimerInput from "../TimerInput";

const EditEventModal = (props) => {
  const { homeTeam, awayTeam } = props;
  let { leagueId, matchId } = useParams();

  const dispatch = useDispatch();
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const isOpen = useSelector((state) => state.home.event_dialog.open);
  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const logId = useSelector((state) => state.home.event_dialog.logId);
  const type = useSelector((state) => state.home.event_dialog.type);

  const log = useSelector((state) => state.home.logs).find(
    (log) => log.id == logId
  );

  const [playerId, setPlayerId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [currentPeriod, setCurrentPeriod] = useState("");
  const [time, setTime] = useState("");
  const [event, setEvent] = useState("");
  const [isDirect, setIsDirect] = useState();

  const [numberOfPeriods, setNumberOfPeriods] = useState([]);
  useEffect(() => {
    setNumberOfPeriods(
      Array.from({ length: match?.period }, (_, index) => index + 1)
    );
  }, [match]);

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
    setCurrentPeriod(log?.period);
    setIsDirect(log?.isDirect);
    if (type === "edit") {
      setTime(
        log?.time.split(":").map(Number)[0] * 6000 +
          log?.time.split(":").map(Number)[1] * 100
      );
    } else {
      setTime(0);
    }
    setEvent(log?.event);
  }, [logId]);

  const [canSubmit, setCanSubmit] = useState();

  useEffect(() => {
    setCanSubmit(type === "edit" ? true : false);
    if (teamId && currentPeriod && time && event) {
      setCanSubmit(true);
    }
  }, [type, playerId, teamId, currentPeriod, time, event]);

  const handleEdit = () => {
    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);
    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);
    if (type === "edit") {
      actions.updateOneLog(dispatch, {
        logId,
        leagueId,
        matchId,
        period: currentPeriod,
        teamId,
        playerId,
        event,
        time:
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0"),
        isDirect,
      });
    } else if (type === "add") {
      let tempPlayerId;
      let tempIsDirect = false;
      if (playerId === undefined) {
        if (teamId == homeTeam?.id) {
          tempPlayerId = filteredHomeTeamMatchups[0]?.playerId;
        } else {
          tempPlayerId = filteredAwayTeamMatchups[0]?.playerId;
        }
        tempIsDirect = true;
      }

      actions.createOneLog(dispatch, {
        leagueId,
        matchId,
        period: currentPeriod,
        teamId,
        playerId: playerId == undefined ? tempPlayerId : playerId,
        event,
        time:
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0"),
        isDirect: tempIsDirect,
      });
    }

    closeDialog();
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
        className="relative z-30"
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
          <div className="flex min-h-full justify-center text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-slate h-[700px] sm:h-[800px] w-[400px] sm:w-[500px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-16 sm:h-[88px] justify-between px-default">
                    <p className="text-xl sm:text-2xl text-white font-bold">
                      {type === "edit" ? "Edit " : "Add "}
                      Event
                    </p>
                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col p-default justify-between">
                    <div className="space-y-3 sm:space-y-6">
                      <div>
                        <p className="text-black dark:text-white font-bold text-sm sm:text-base">
                          Event Time
                        </p>
                        <div className="flex space-x-3 mt-[10px] text-sm">
                          {numberOfPeriods.map((period) => (
                            <div
                              className={`flex items-center justify-center rounded-[10px] ${
                                currentPeriod === period
                                  ? "bg-success"
                                  : "bg-[#303335]"
                              } w-16 h-10 cursor-pointer hover:opacity-75`}
                              onClick={() => setCurrentPeriod(period)}
                            >
                              <p className="text-white">P{period}</p>
                            </div>
                          ))}
                          <div className="hidden sm:flex items-center justify-center rounded-[10px] w-16 h-10 cursor-pointer hover:bg-opacity-70">
                            <img
                              src={rightArrowIcon}
                              alt=""
                              className="w-[14px] h-[21px]"
                            />
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-default bg-[#303335] w-[141px] h-button cursor-pointer`}
                          >
                            <TimerInput
                              className="bg-[#303335]"
                              initialTime={time}
                              setTime={setTime}
                            ></TimerInput>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="grid grid-cols-3 gap-2 text-sm text-black dark:text-white">
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "+3 Pointer"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-10 sm:h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("+3 Pointer")}
                          >
                            +3
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "+2 Pointer"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-10 sm:h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("+2 Pointer")}
                          >
                            +2
                          </div>
                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "+1 Pointer"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-10 sm:h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("+1 Pointer")}
                          >
                            +1
                          </div>
                          {league?.displayAttempts3 && (
                            <div
                              className={`flex items-center justify-center rounded-[10px] ${
                                event === "3 Missed"
                                  ? "bg-primary"
                                  : "bg-[#303335]"
                              } w-full h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                              onClick={() => setEvent("3 Missed")}
                            >
                              <p className="text-black dark:text-white">
                                MISSED 3
                              </p>
                            </div>
                          )}
                          {league?.displayAttempts2 && (
                            <div
                              className={`flex items-center justify-center rounded-[10px] ${
                                event === "2 Missed"
                                  ? "bg-primary"
                                  : "bg-[#303335]"
                              } w-full h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                              onClick={() => setEvent("2 Missed")}
                            >
                              <p className="text-black dark:text-white">
                                MISSED 2
                              </p>
                            </div>
                          )}
                          {league?.displayAttempts1 && (
                            <div
                              className={`flex items-center justify-center rounded-[10px] ${
                                event === "1 Missed"
                                  ? "bg-primary"
                                  : "bg-[#303335]"
                              } w-full h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                              onClick={() => setEvent("1 Missed")}
                            >
                              <p className="text-black dark:text-white">
                                MISSED 1
                              </p>
                            </div>
                          )}
                          {league?.displayRebounds && (
                            <div
                              className={`flex items-center justify-center rounded-[10px] ${
                                event === "Rebound"
                                  ? "bg-primary"
                                  : "bg-[#303335]"
                              } w-full h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                              onClick={() => setEvent("Rebound")}
                            >
                              <p className="text-black dark:text-white">
                                REBOUNDS
                              </p>
                            </div>
                          )}
                          {league?.displayTurnovers && (
                            <div
                              className={`flex items-center justify-center rounded-[10px] ${
                                event === "Turnover"
                                  ? "bg-primary"
                                  : "bg-[#303335]"
                              } w-full h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                              onClick={() => setEvent("Turnover")}
                            >
                              <p className="text-black dark:text-white">
                                TURNOVER
                              </p>
                            </div>
                          )}
                          {league?.displayFouls && (
                            <div
                              className={`flex items-center justify-center rounded-[10px] ${
                                event === "Foul" ? "bg-primary" : "bg-[#303335]"
                              } w-full h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                              onClick={() => setEvent("Foul")}
                            >
                              <p className="text-black dark:text-white">FOUL</p>
                            </div>
                          )}

                          <div
                            className={`flex items-center justify-center rounded-[10px] ${
                              event === "TimeOut"
                                ? "bg-primary"
                                : "bg-[#303335]"
                            } w-full h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                            onClick={() => setEvent("TimeOut")}
                          >
                            <p className="text-black dark:text-white">
                              TIMEOUT
                            </p>
                          </div>
                          {league?.displayBlocks && (
                            <div
                              className={`flex items-center justify-center rounded-[10px] ${
                                event === "Block"
                                  ? "bg-primary"
                                  : "bg-[#303335]"
                              } w-full h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                              onClick={() => setEvent("Block")}
                            >
                              <p className="text-black dark:text-white">
                                BLOCK
                              </p>
                            </div>
                          )}
                          {league?.displayAssists && (
                            <div
                              className={`flex items-center justify-center rounded-[10px] ${
                                event === "Assist"
                                  ? "bg-primary"
                                  : "bg-[#303335]"
                              } w-full h-10 sm:h-14 cursor-pointer hover:opacity-75`}
                              onClick={() => setEvent("Assist")}
                            >
                              <p className="text-black dark:text-white">
                                ASSIST
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="overflow-y-auto h-60">
                        <Tab.Group
                          defaultIndex={teamId == homeTeam?.id ? 0 : 1}
                        >
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
                                onClick={() => setTeamId(homeTeam?.id)}
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
                                onClick={() => setTeamId(awayTeam?.id)}
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
                                {event !== "TimeOut" &&
                                  filteredHomeTeamMatchups.map(
                                    ({ player }, idx) => (
                                      <EventPlayerList
                                        key={idx}
                                        className="mb-2 sm:mb-5"
                                        player={player}
                                        playerId={playerId}
                                        setPlayerId={setPlayerId}
                                        setTeamId={setTeamId}
                                        setIsDirect={setIsDirect}
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
                                      className="mb-2 sm:mb-5"
                                      player={player}
                                      playerId={playerId}
                                      setPlayerId={setPlayerId}
                                      setTeamId={setTeamId}
                                      setIsDirect={setIsDirect}
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
                      <div className="flex justify-between mt-5 px-5 sm:px-0">
                        <button
                          onClick={closeDialog}
                          className={`bg-red-600 rounded-default w-24 sm:w-[147px] w-10 sm:h-[53px] hover:bg-opacity-70  text-white disabled:opacity-10`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleEdit}
                          className={`bg-primary rounded-default w-24 sm:w-[231px] h-10 sm:h-[53px] hover:bg-opacity-70 text-white disabled:opacity-10`}
                          disabled={!canSubmit}
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

export default EditEventModal;
