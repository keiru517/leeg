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
import { useParams } from "react-router";
import Button from "../Button";
import Select from "../Select";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import deleteIcon from "../../assets/img/dark_mode/delete.png";
import editIcon from "../../assets/img/dark_mode/edit.png";
const LeagueModal = (props) => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.league.league_dialog_open);
  const type = useSelector((state) => state.league.league_dialog_type);

  let { id } = useParams();
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == id
  );

  // const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const cancelButtonRef = useRef(null);

  const sportOptions = ["Basketball", "Rugby", "Hockey", "Baseball"];

  const [leagueName, setLeagueName] = useState(league.name);
  const [leagueDescription, setLeagueDescription] = useState(league.description);

  console.log("modal status", status);

  const handleEdit = () => {
    dispatch({ type: actions.UPDATE_LEAGUE_DIALOG_TYPE, payload: "edit" });
    dispatch({ type: actions.OPEN_LEAGUE_DIALOG, payload: true });
  };

  const handleDelete = () => {
    dispatch({ type: actions.UPDATE_LEAGUE_DIALOG_TYPE, payload: "delete" });
    dispatch({ type: actions.OPEN_LEAGUE_DIALOG, payload: true });
  };

  const closeDialog = () => {
    setStep(1);
    dispatch({ type: actions.OPEN_LEAGUE_DIALOG, payload: false });
    setLeagueName(league.name)
    setLeagueName(league.description)
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-slate h-[609px] md:w-[735px] mx-3 flex flex-col">
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
                      {type === "edit" ? (
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
                      )}
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
                          class="block p-2.5 w-full text-xs text-gray-900 rounded-lg border border-charcoal focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-charcoal dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none outline-none"
                          placeholder="Describe your League*"
                          value={leagueDescription}
                          onChange={(e) => setLeagueDescription(e.target.value)}
                        ></textarea>
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            className="rounded-default text-xs"
                            placeholder="Start Date: Friday, July 2023"
                            option={calendar}
                            ></Input>
                          <Input
                            className="rounded-default text-xs"
                            placeholder="End Date: Friday, July 2023"
                            option={calendar}
                          ></Input>

                        </div>
                        <Button className="bg-primary rounded-xl w-full h-[53px] hover:bg-sky-600">
                          Edit League
                        </Button>
                      </>
                    ) : (
                      <Input
                        className="rounded-default text-xs"
                        placeholder="Type League Name*"
                      ></Input>
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
