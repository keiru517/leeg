import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import close from "../../assets/img/dark_mode/close.png";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";

const SubstituteModal = () => {
  let { leagueId, match_id } = useParams();
  console.log(leagueId, match_id)
  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.substitute_dialog.open);

  const closeDialog = () => {
    // dispatch({ type: actions.OPEN_CREATE_TEAM_DIALOG, payload: false });
    dispatch({ type: actions.CLOSE_ADD_SUBSTITUTE_DIALOG });
  };


  const createSubmit = () => {
    console.log("Add Substitute to the match");
    dispatch({ type: actions.CLOSE_ADD_SUBSTITUTE_DIALOG });
  };

  const cancelButtonRef = useRef(null);

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
                      Add Substitute
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
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        className="rounded-default text-xs h-12"
                        placeholder="First Name*"
                      ></Input>
                      <Input
                        className="rounded-default text-xs h-12"
                        placeholder="Last Name*"
                      ></Input>
                      <Input
                        className="rounded-default col-span-2 text-xs h-12"
                        placeholder="Jersey Number*"
                      ></Input>
                    </div>
                    <button
                      onClick={createSubmit}
                      className="bg-primary rounded-xl w-full hover:bg-opacity-70 h-button text-white"
                    >
                      Add Substitute
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

export default SubstituteModal;
