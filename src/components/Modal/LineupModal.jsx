import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
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
import LineupTable from "../Table/Lineup";

const LineupModal = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.team_dialog.open);
  const type = useSelector((state) => state.home.team_dialog.type);

  const team = useSelector((state) => state.home.team_dialog.team);
  // if (type != 'create') {

  // }
  const closeDialog = () => {
    setStep(1);
    // dispatch({ type: actions.OPEN_CREATE_TEAM_DIALOG, payload: false });
    dispatch({ type: actions.CLOSE_TEAM_DIALOG });
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

  const players = useSelector(state=>state.home.players).find(player=>player.team_id==id)

  const [sport, setSport] = useState("Select Sport*");
  const [teamName, setTeamName] = useState(team.name);
  const [leagueDescription, setLeagueDescription] = useState("");

  const createLeague = () => {};

  return (
    <Transition.Root show={true} as={Fragment}>
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
                      Edit Lineups
                    </p>
                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between h-[521px]">
                      <LineupTable></LineupTable>
                      <button
                        onClick={createSubmit}
                        className="bg-primary rounded-xl w-full hover:bg-opacity-70 h-button text-white"
                      >
                        Add Substituties
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

export default LineupModal;
