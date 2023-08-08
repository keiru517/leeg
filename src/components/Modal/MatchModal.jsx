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
import logo from "../../assets/img/dark_mode/league-logo.png";
import avatar from "../../assets/img/dark_mode/player.png";
import PlayerList from "../ListItem/PlayerList";

const MatchModal = () => {

  
  const cancelButtonRef = useRef(null);


  const options = [
    'Real Madrid',
    'Manchester City',
    'FC Barcelona'
  ]
  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.match_dialog.open);
  const type = useSelector((state) => state.home.match_dialog.type);

  const team = useSelector((state) => state.home.match_dialog.match);
  // if (type != 'create') {

  // }
  const closeDialog = () => {
    // dispatch({ type: actions.OPEN_CREATE_TEAM_DIALOG, payload: false });
    dispatch({ type: actions.CLOSE_MATCH_DIALOG });
  };

  const handleDelete = () => {
    dispatch({ type: actions.OPEN_DELETE_TEAM_DIALOG, payload: team });
    // dispatch({ type: actions.OPEN_TEAM_DIALOG, payload: true });
  };

  const handleEdit = () => {
    dispatch({ type: actions.OPEN_EDIT_TEAM_DIALOG, payload: {open:true, type:'edit', team:team} });
    // dispatch({ type: actions.OPEN_TEAM_DIALOG, payload: true });
  };

  const createSubmit = () => {
    dispatch({ type: actions.CLOSE_TEAM_DIALOG });
    console.log("Clicked create");
  };

  const editSubmit = () => {
    dispatch({ type: actions.CLOSE_TEAM_DIALOG });
    console.log("Clicked edit");
  };

  const deleteSubmit = () => {
    dispatch({ type: actions.CLOSE_TEAM_DIALOG });
    console.log("Clicked delete");
  };


  const [sport, setSport] = useState("Select Sport*");
  // const [teamName, setTeamName] = useState(team.name);


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
                      Create Match
                    </p>
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
                        <Select options={options} className="rounded-default w-full h-12 text-xs">Select Home Team*</Select>
                        <Select options={options} className="rounded-default w-full h-12 text-xs">Select Away Team*</Select>
                        <Input className="rounded-default text-xs h-12" placeholder="Enter Date*"></Input>
                        <Input className="rounded-default text-xs h-12" placeholder="Select Time*"></Input>
                        <Input className="rounded-default col-span-2 text-xs h-12" placeholder="Enter Location"></Input>
                      </div>
                    </div>
                      <button
                        onClick={createSubmit}
                        className="bg-primary rounded-xl w-full hover:bg-opacity-70 h-button text-white"
                      >
                        Create Match
                      </button>
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
