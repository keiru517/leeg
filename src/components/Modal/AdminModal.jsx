import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import close from "../../assets/img/dark_mode/close.png";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import apis from "../../utils/apis";

const AdminModal = (props) => {
  const dispatch = useDispatch();
  let { user, leagueId } = props;

  const status = useSelector((state) => state.home.admin_dialog.open);

  // const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const [email, setEmail] = useState("");

  const closeDialog = () => {
    setEmail("");
    dispatch({ type: actions.OPEN_ADMIN_DIALOG, payload: false });
  };

  const inviteAdmin = () => {
    if (email === "") {
      alert("Please type email of the admin you want to add!");
    } else {
      axios
        .post(apis.inviteAdmin, { email, leagueId, inviter: user })
        .then((res) => {
          dispatch({ type: actions.OPEN_ADMIN_DIALOG, payload: false });
          actions.getAdmins(dispatch);
          actions.getLeagues(dispatch);
          actions.getPlayers(dispatch);
          alert(res.data.message);
          setEmail("");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[609px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      Invite Admin
                    </p>
                    <img
                      src={close}
                      onClick={closeDialog}
                      className="cursor-pointer hover:opacity-70"
                    ></img>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    <Input
                      className="rounded-default text-xs"
                      placeholder="Enter the email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                    <button
                      onClick={inviteAdmin}
                      className="bg-primary rounded-xl w-full hover:bg-sky-600 text-white h-button"
                    >
                      Invite Admin
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

export default AdminModal;
