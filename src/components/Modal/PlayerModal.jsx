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
import Datepicker from "react-tailwindcss-datepicker";

const PlayerModal = (props) => {
  const dispatch = useDispatch();

  const status = useSelector(state => state.home.player_dialog.open);


  // const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const closeDialog = () => {
    dispatch({ type: actions.OPEN_INVITE_PLAYER_DIALOG, payload: false });
  };


  const invitePlayer = () => {
    console.log("invite player")
  }

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
                      Invite Player
                    </p>
                    <img
                      src={close}
                      onClick={closeDialog}
                      className="cursor-pointer hover:opacity-70"
                    ></img>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                      <Input className='rounded-default text-xs' placeholder='Copy Link'></Input>
                      <button onClick={invitePlayer} className='bg-primary rounded-xl w-full hover:bg-sky-600 text-white h-button'>Copy Link</button>
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

export default PlayerModal;
