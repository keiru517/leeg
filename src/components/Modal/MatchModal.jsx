import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import close from "../../assets/img/dark_mode/close.png";
import Select from "../Select";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import { useParams } from "react-router-dom";
import axios from "axios";
import apis from "../../utils/apis";

const MatchModal = () => {
  let { leagueId } = useParams();
  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.match_dialog.open);
  const type = useSelector((state) => state.home.match_dialog.type);
  const match = useSelector((state) => state.home.match_dialog.match);
  const teams = useSelector((state) => state.home.teams).filter(
    (team) => team.leagueId == leagueId && team.isDeleted !== 1
  );

  const options = teams;
  const [homeValue, setHomeValue] = useState({ name: "Select Home Team*" });
  const [awayValue, setAwayValue] = useState({ name: "Select Away Team*" });

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const closeDialog = () => {
    dispatch({ type: actions.CLOSE_MATCH_DIALOG });
    setHomeValue({ name: "Select Home Team*" });
    setAwayValue({ name: "Select Away Team*" });
    setDate("");
    setTime("");
    setLocation("");
  };

  useEffect(() => {
    if (type === "edit") {
      const homeTeam = teams.find((team) => team.id == match?.homeTeamId);
      const awayTeam = teams.find((team) => team.id == match?.awayTeamId);
      setHomeValue({ id: homeTeam.id, name: homeTeam.name });
      setAwayValue({ id: awayTeam.id, name: awayTeam.name });
      setDate(match?.date);
      setTime(match?.time);
      setLocation(match?.location);
    }
  }, [type]);
  const createSubmit = () => {
    actions.createMatch(dispatch, {
      leagueId: leagueId,
      homeTeamId: homeValue.id,
      awayTeamId: awayValue.id,
      date,
      time,
      location,
    });
    dispatch({ type: actions.CLOSE_MATCH_DIALOG });
  };

  const updateSubmit = () => {
    actions.updateMatch(dispatch, { id: match?.id, date, time, location });
    dispatch({ type: actions.CLOSE_MATCH_DIALOG });
  };

  return (
    <Transition.Root show={status} as={Fragment}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[609px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <div className="flex items-center">
                      <p className="text-2xl text-black dark:text-white font-bold">
                        {type === "create" ? "Create" : "Edit"} Match
                      </p>
                      {type === "edit" && (
                        <div className="flex space-x-3 items-center ml-5">
                          <div className="flex">
                            <img
                              src={
                                teams.find(
                                  (team) => team.id == match.homeTeamId
                                )?.logo
                              }
                              alt=""
                              className="w-6 h-6 rounded-full border border-gray-500"
                            />
                          </div>
                          <p className="dark:text-white text-black font-bold">
                            :
                          </p>
                          <div className="flex">
                            <img
                              src={
                                teams.find(
                                  (team) => team.id == match.awayTeamId
                                )?.logo
                              }
                              alt=""
                              className="w-6 h-6 rounded-full border border-gray-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between ">
                    <div>
                      <div className="grid grid-cols-2 gap-[10px]">
                        {type === "create" && (
                          <>
                            <Select
                              options={options.filter(
                                (option) =>
                                  option.id != homeValue.id &&
                                  option.id != awayValue.id
                              )}
                              // handleClick={e=>handleHome(e)}
                              handleClick={(e) => setHomeValue(e)}
                              value={homeValue.name}
                              className="rounded-default w-full h-12 text-xs"
                            >
                              Select Home Team*
                            </Select>
                            <Select
                              options={options.filter(
                                (option) =>
                                  option.id != homeValue.id &&
                                  option.id != awayValue.id
                              )}
                              // options={options}
                              handleClick={(e) => setAwayValue(e)}
                              value={awayValue.name}
                              className="rounded-default w-full h-12 text-xs"
                            >
                              Select Away Team*
                            </Select>
                          </>
                        )}
                        <Input
                          className="rounded-default text-xs h-12"
                          placeholder="Enter Date*"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        ></Input>
                        <Input
                          className="rounded-default text-xs h-12"
                          placeholder="Select Time*"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        ></Input>
                        <input
                          className="col-span-2 border border-charcoal items-center px-3 bg-transparent outline-none text-black dark:text-white flex-grow h-button text-xs w-full rounded-default"
                          placeholder="Enter Location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    {type === "create" ? (
                      <button
                        onClick={createSubmit}
                        className="bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white disabled:opacity-10"
                      >
                        Create Match
                      </button>
                    ) : (
                      <button
                        onClick={updateSubmit}
                        className="bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white disabled:opacity-10"
                      >
                        Update Match
                      </button>
                    )}
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

export default MatchModal;
