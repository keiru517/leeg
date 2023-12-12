import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import * as actions from "../../actions";
import close from "../../assets/img/dark_mode/close.png";
import uploadCircle from "../../assets/img/dark_mode/upload-circle.png";
import calendar from "../../assets/img/dark_mode/calendar.png";
import Input from "../Input";
import axios from "axios";
import apis from "../../utils/apis";

const LeagueModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector((state) => state.home.league_dialog.open);
  const type = useSelector((state) => state.home.league_dialog.type);

  let { leagueId } = useParams();
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const [step, setStep] = useState(1);

  const cancelButtonRef = useRef(null);

  const [leagueName, setLeagueName] = useState(league?.name);
  const [confirmLeagueName, setConfirmLeagueName] = useState("");

  const [leagueDescription, setLeagueDescription] = useState(
    league?.description
  );

  const [startDate, setStartDate] = useState(league?.startDate);
  const [endDate, setEndDate] = useState(league?.endDate);

  // const handleEdit = () => {
  //   dispatch({ type: actions.OPEN_EDIT_LEAGUE_DIALOG, payload: league });
  // };

  const deleteSubmit = () => {

    if (confirmLeagueName == "") {
      alert("Please type the league name you want to delete for confirmation.");
    } else if (confirmLeagueName === leagueName) {
      axios
        .delete(apis.deleteLeague(league.id))
        .then((res) => {
          alert(res.data.message);
          actions.getLeagues(dispatch);
          navigate('/');
        })
        .catch((error) => alert(error.response.data.message));
      dispatch({ type: actions.CLOSE_LEAGUE_DIALOG });
    } else {
      alert("Please type the league name correctly.");
    }
  };

  const closeDialog = () => {
    setStep(1);
    dispatch({ type: actions.CLOSE_LEAGUE_DIALOG });
    setConfirmLeagueName("");
  };

  const editSubmit = () => {
    dispatch({ type: actions.CLOSE_LEAGUE_DIALOG });
    axios
      .post(apis.updateLeague, {
        id: leagueId,
        name: leagueName,
        description: leagueDescription,
        logo: "updated logo",
        startDate: startDate,
        endDate: endDate,
      })
      .then((res) => {
        actions.getLeagues(dispatch);
        alert(res.data.message);
      });
    console.log("Clicked edit");
  };

  // const deleteSubmit = () => {
  //   dispatch({ type: actions.OPEN_CREATE_LEAGUE_DIALOG, payload: false });
  //   console.log("Clicked delete");
  // };

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[609px] w-[400px] sm:w-[500px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    {type === "edit" ? (
                      <p className="text-2xl text-white font-bold">
                        Edit League
                      </p>
                    ) : (
                      <p className="text-2xl text-white font-bold">
                        Delete League
                      </p>
                    )}
                    <div className="flex items-center">
                      {/* {type === "edit" ? (
                        <img
                          src={deleteIcon}
                          onClick={handleDelete}
                          className="h-[18px] w-[18px] cursor-pointer hover:opacity-70"
                        ></img>
                      ) : (
                        <img
                          src={editIcon}
                          onClick={handleEdit}
                          className="h-[18px] w-[18px] cursor-pointer hover:opacity-70"
                        ></img>
                      )} */}
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer ml-5 hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    {type === "edit" ? (
                      <>
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
                          className="rounded-default text-xs"
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
                          onChange={(e) => setLeagueDescription(e.target.value)}
                        ></textarea>
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            className="rounded-default text-xs"
                            placeholder="Start Date: Friday, July 2023"
                            option={calendar}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          ></Input>
                          <Input
                            className="rounded-default text-xs"
                            placeholder="End Date: Friday, July 2023"
                            option={calendar}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          ></Input>
                        </div>
                        <button
                          onClick={editSubmit}
                          className="bg-primary rounded-xl w-full h-button hover:opacity-70 text-white"
                        >
                          Edit League
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col justify-between h-full">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-dark-gray w-full h-14 rounded-default py-1.5 px-4">
                            <div className="flex items-center">
                              <img
                                src={league?.logo}
                                className="w-10 h-10 mr-3 rounded-default"
                                alt=""
                              />
                              <div className="">
                                <p className="text-white text-base">
                                  {league?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Input
                            className="rounded-default text-xs"
                            placeholder="Type League Name*"
                            value={confirmLeagueName}
                            onChange={(e) =>
                              setConfirmLeagueName(e.target.value)
                            }
                          ></Input>
                        </div>

                        <button
                          onClick={deleteSubmit}
                          className="bg-danger bg-opacity-10 rounded-xl w-full h-12 text-danger font-semibold hover:opacity-70"
                        >
                          Delete League
                        </button>
                      </div>
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

export default LeagueModal;
