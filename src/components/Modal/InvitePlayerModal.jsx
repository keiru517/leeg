import { Fragment, useRef, useState } from "react";
import { useParams } from "react-router";
import { Dialog, Transition } from "@headlessui/react";
import close from "../../assets/img/dark_mode/close.png";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";

const InvitePlayerModal = (props) => {
  const dispatch = useDispatch();
  let { leagueId} = useParams();

  const status = useSelector(state => state.home.player_dialog.open);
  const user = useSelector(state=>state.home.user);

  const [email, setEmail] = useState("");

  const cancelButtonRef = useRef(null);

  const closeDialog = () => {
    dispatch({ type: actions.OPEN_INVITE_PLAYER_DIALOG, payload: false });
  };
  
  
  const invitePlayer = () => {
    actions.invitePlayer(dispatch, {email:email, leagueId:leagueId, inviter:user})
    dispatch({ type: actions.OPEN_INVITE_PLAYER_DIALOG, payload: false });
  }

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
                    <p className="text-2xl text-black dark:text-white font-bold">
                      Invite Player
                    </p>
                    <img
                      src={close}
                      onClick={closeDialog}
                      className="cursor-pointer hover:opacity-70"
                    ></img>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                      <Input className='rounded-default text-xs' placeholder='Type email address'
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      ></Input>
                      <button onClick={invitePlayer} className='bg-primary rounded-default w-full hover:bg-sky-600 text-white h-button'>Invite</button>
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

export default InvitePlayerModal;
