import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import close from "../../assets/img/dark_mode/close.png";
import btn1 from "../../assets/img/dark_mode/btn1.png";
import btn1Selected from "../../assets/img/dark_mode/btn1-selected.png";
import btn2 from "../../assets/img/dark_mode/btn2.png";
import btn2Selected from "../../assets/img/dark_mode/btn2-selected.png";
import btn3 from "../../assets/img/dark_mode/btn3.png";
import uploadCircle from "../../assets/img/dark_mode/upload-circle.png";
import calendar from "../../assets/img/dark_mode/calendar.png";
import Button from "../Button";
import Select from "../Select";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Modal = (props) => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.league_dialog.open);

  // const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const cancelButtonRef = useRef(null);

  const sportOptions = ["Basketball", "Rugby", "Hockey", "Baseball"];

  const closeDialog = () => {
    setStep(1);
    dispatch({ type: actions.OPEN_CREATE_LEAGUE_DIALOG, payload: false });
  };

  const goToStep1 = () => {
    setStep(1);
  };

  const goToStep2 = () => {
    setStep(2);
  };

  const goToStep3 = () => {
    setStep(3);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [sport, setSport] = useState("Select Sport*");
  const [leagueName, setLeagueName] = useState("");
  const [leagueDescription, setLeagueDescription] = useState("");
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  const createLeague = () => {
    axios
      .post("/league/create", {
        sport: sport,
        name: leagueName,
        description: leagueDescription,
        startDate: startDate,
        endDate: endDate,
      })
      .then((res) => {
        // dispatch({type:actions.GET_LEAGUES})
        actions.fetchLeagues(dispatch)
        dispatch({type: actions.CLOSE_LEAGUE_DIALOG})
        setSport("Select Sport*");
        setLeagueName("");
        setLeagueDescription("");
        setStartDate(currentDate);
        setEndDate(currentDate);
        goToStep1()
        alert(res.data.message);

        // Navigate(-1);
      })
      .catch((err) => console.log(err.data));
  };

  return (
    <Transition.Root show={status} as={Fragment}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main pb-4 text-left shadow-xl transition-all sm:my-8 bg-slate h-[609px] md:w-[735px] mx-3">
                <div className="divide-y divide-solid divide-[#3A3A3A]">
                  <div className="flex items-center text-left h-[88px] justify-between px-[26px]">
                    <p className="text-2xl text-white font-bold">
                      Create League
                    </p>
                    <img
                      src={close}
                      onClick={closeDialog}
                      className="cursor-pointer hover:opacity-70"
                    ></img>
                  </div>
                  <div className="flex divide-x divide-solid divide-[#3A3A3A]">
                    <div className="flex flex-col space-y-8 w-[290px] h-[521px] p-default">
                      <div
                        className={
                          step == 1
                            ? "flex w-[238px] h-12 bg-primary rounded-full items-center text-white text-sm font-medium"
                            : "flex w-[238px] h-12 rounded-full items-center text-white text-sm font-bold"
                        }
                      >
                        {step == 1 ? (
                          <img src={btn1} alt="" className="px-2" />
                        ) : (
                          <img src={btn1Selected} alt="" className="px-2" />
                        )}
                        Select Sport
                      </div>
                      <div
                        className={
                          step == 2
                            ? "flex w-[238px] h-12 bg-primary rounded-full items-center text-white text-sm font-medium"
                            : step == 3
                            ? "flex w-[238px] h-12 rounded-full items-center text-white text-sm font-bold"
                            : "flex w-[238px] h-12 rounded-full items-center text-font-dark-gray text-sm font-bold"
                        }
                      >
                        {step == 3 ? (
                          <img src={btn2Selected} alt="" className="px-2" />
                        ) : (
                          <img src={btn2} alt="" className="px-2" />
                        )}
                        Basic Details
                      </div>
                      <div
                        className={
                          step == 3
                            ? "flex w-[238px] h-12 bg-primary rounded-full items-center text-white text-sm font-medium"
                            : "flex w-[238px] h-12 rounded-full items-center text-font-dark-gray text-sm font-bold"
                        }
                      >
                        <img src={btn3} alt="" className="px-2" />
                        Schedule
                      </div>
                    </div>
                    <div className="flex flex-col w-[444px] p-default">
                      {step == 1 ? (
                        <>
                          <Select
                            className="w-full h-[48px] rounded-default"
                            options={sportOptions}
                            handleClick={(e) => setSport(e)}
                            value={sport}
                          >
                            {sport}
                          </Select>
                          <button
                            onClick={goToStep2}
                            className="bg-primary w-full h-button rounded-xl mt-auto text-white font-bold text-sm hover:bg-sky-600 focus:ring-2"
                          >
                            Next: Basic Details
                          </button>
                        </>
                      ) : step == 2 ? (
                        <>
                          <div>
                            <div className="flex w-full h-[86px] bg-charcoal rounded-default items-center">
                              <img
                                src={uploadCircle}
                                alt=""
                                className="px-[14px]"
                              />
                              <p className="text-white font-bold text-sm">
                                Upload League Logo
                              </p>
                            </div>
                            <Input
                              className="rounded-default text-xs my-5"
                              placeholder="Type League Name*"
                              value={leagueName}
                              onChange={(e) => setLeagueName(e.target.value)}
                            ></Input>

                            <textarea
                              id="message"
                              rows="6"
                              className="block p-2.5 w-full text-xs text-gray-900 rounded-lg border border-charcoal focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-charcoal dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none outline-none"
                              placeholder="Describe your League*"
                              value={leagueDescription}
                              onChange={(e) =>
                                setLeagueDescription(e.target.value)
                              }
                            ></textarea>
                          </div>
                          <div className="flex mt-auto w-full justify-between">
                            <button
                              onClick={goToStep1}
                              className="bg-[#3A3A3A] w-[169px] h-button rounded-xl mt-auto text-white font-semibold text-sm dark:hover:bg-middle-gray focus:ring-2"
                            >
                              Back to Step 1
                            </button>
                            <button
                              onClick={goToStep3}
                              className="bg-primary w-[169px] h-button rounded-xl mt-auto text-white font-semibold text-sm hover:bg-sky-600 focus:ring-2"
                            >
                              Next: Schedule
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-full h-29">
                            <Input
                              className="text-xs rounded-default mb-5"
                              option={calendar}
                              placeholder="Enter Season Start Date*"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                            <Input
                              className="text-xs rounded-default"
                              option={calendar}
                              placeholder="Enter Season End Date*"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                          </div>
                          <div className="flex mt-auto w-full justify-between">
                            <button
                              onClick={goToStep2}
                              className="bg-[#3A3A3A] w-[169px] h-button rounded-xl mt-auto text-white font-semibold text-sm hover:bg-gray-700 focus:ring-2"
                            >
                              Back to Step 2
                            </button>
                            <button
                              onClick={createLeague}
                              className="bg-primary w-[169px] h-button rounded-xl mt-auto text-white font-semibold text-sm hover:bg-sky-600 focus:ring-2"
                            >
                              Create League
                            </button>
                          </div>
                        </>
                      )}
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

export default Modal;
