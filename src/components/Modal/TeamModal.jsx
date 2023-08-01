import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import close from "../../assets/img/dark_mode/close.png";
import btn1 from "../../assets/img/dark_mode/btn1.png";
import deleteIcon from "../../assets/img/dark_mode/delete.png";
import editIcon from "../../assets/img/dark_mode/edit.png";
import search from "../../assets/img/dark_mode/search.png";
import btn3 from "../../assets/img/dark_mode/btn3.png";
import uploadCircle from "../../assets/img/dark_mode/upload-circle.png";
import calendar from "../../assets/img/dark_mode/calendar.png";
import Button from "../Button";
import Select from "../Select";
import Input from "../Input";
import ListItem from "../ListItem";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import Datepicker from "react-tailwindcss-datepicker";
import logo from "../../assets/img/dark_mode/team-logo.png";
import avatar from "../../assets/img/dark_mode/player.png";
import PlayerList from "../ListItem/PlayerList";

const TeamModal = (props) => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.league.dialog_open);
  const type = useSelector((state) => state.league.dialog_type);

  const closeDialog = () => {
    setStep(1);
    dispatch({ type: actions.OPEN_TEAM_DIALOG, payload: false });
  };

  const openDeleteDialog = () => {
    dispatch({ type: actions.UPDATE_DIALOG_TYPE, payload: "delete" });
    dispatch({ type: actions.OPEN_TEAM_DIALOG, payload: true });
  };

  const openEditDialog = () => {
    dispatch({ type: actions.UPDATE_DIALOG_TYPE, payload: "edit" });
    dispatch({ type: actions.OPEN_TEAM_DIALOG, payload: true });
  };

  // const type = "delete";

  // const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const cancelButtonRef = useRef(null);

  const sportOptions = ["Basketball", "Rugby", "Hockey", "Baseball"];

  const goToStep1 = () => {
    setStep(1);
  };

  const goToStep2 = () => {
    setStep(2);
  };

  const goToStep3 = () => {
    setStep(3);
  };

  const players = [
    {
      id:1,
      name: "Tornike Shengelia",
      avatar: avatar,
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
      team_id: 2
    },
    {
      id:2,
      name: "Tornike Shengelia",
      avatar: avatar,
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
      team_id: 1
    },
    {
      id:3,
      name: "Tornike Shengelia",
      avatar: avatar,
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
      team_id: 2
    },
    {
      id:4,
      name: "Tornike Shengelia",
      avatar: avatar,
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
      team_id: 1
    },
    {
      id:5,
      name: "Tornike Shengelia",
      avatar: avatar,
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
      team_id: 1
    },
    {
      id:6,
      name: "Tornike Shengelia",
      avatar: avatar,
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
      team_id: 1
    },
    {
      id:7,
      name: "Tornike Shengelia",
      avatar: avatar,
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
      team_id: 1
    },
    {
      id:8,
      name: "Tornike Shengelia",
      avatar: avatar,
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
      team_id: 1
    },
    {
      id:9,
      name: "Tornike Shengelia",
      avatar: avatar,
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
      team_id: 1
    },
    {
      id:10,
      name: "Tornike Shengelia",
      avatar: avatar,
      email: "James@gmail.com",
      created_at: "June 26, 2023, 10:00PM",
      team_id: 1
    },
  ];


  const [sport, setSport] = useState("Select Sport*");
  const [leagueName, setLeagueName] = useState("");
  const [leagueDescription, setLeagueDescription] = useState("");

  const createLeague = () => {};

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
                    <p className="text-2xl text-white font-bold">
                      {type == "create"
                        ? "Create Team"
                        : type == "edit"
                        ? "Edit Team"
                        : type === "delete"
                        ? "Delete Team"
                        : "Add Players To Team"}
                    </p>
                    <div className="flex items-center">
                      {type === "edit" ? (
                        <img
                          src={deleteIcon}
                          alt=""
                          className="w-[18px] h-[18px] mr-5 cursor-pointer"
                          onClick={openDeleteDialog}
                        />
                      ) : type === "delete" ? (
                        <img
                          src={editIcon}
                          alt="sdf"
                          className="w-[18px] h-[18px] mr-5 cursor-pointer"
                          onClick={openEditDialog}
                        />
                      ) : (
                        ""
                      )}
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    <div>
                      {type === "create" || type === "edit" ? (
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
                            className="rounded-default text-xs mt-5"
                            placeholder="Type Team Name*"
                          ></Input>
                        </>
                      ) : type === "delete" ? (
                        ""
                      ) : type === "addPlayer" ? (
                        <>
                          <div className="flex bg-[#4A5462] h-[66px] rounded-default p-4 items-center">
                            <img src={logo} alt="" />
                            <p className="text-white underline mx-2 text-sm">Bucks</p>
                            <p className="text-white text-[10px]">10/12</p>
                          </div>
                          <Input
                            className="rounded-lg my-[10px]"
                            icon={search}
                            placeholder="Search Players"
                          />
                          <div className="overflow-y-auto h-[469px]">
                            {
                              players.map((player, idx)=>(
                                <PlayerList
                                key={idx}
                                className="mb-5"
                                player={player}
                                team_id={1}
                              ></PlayerList>
                              
                              ))
                            }
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {type === "create" ? (
                      <Button className="bg-primary rounded-xl w-full hover:bg-sky-600">
                        Create Team
                      </Button>
                    ) : type === "edit" ? (
                      <Button className="bg-primary rounded-xl w-full hover:bg-sky-600">
                        Edit Team
                      </Button>
                    ) : type === "delete" ? (
                      <button className="bg-danger bg-opacity-10 rounded-xl w-full h-12 text-danger font-semibold">
                        Delete Team
                      </button>
                    ) : (
                      ""
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

export default TeamModal;
