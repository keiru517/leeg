import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import close from "../../assets/img/dark_mode/close.png";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import apis from "../../utils/apis";
import deleteIconDark from "../../assets/img/dark_mode/delete-icon-dark.svg";
import deleteIconLight from "../../assets/img/dark_mode/delete-icon-light.svg";

const CommentModal = (props) => {
  const dispatch = useDispatch();
  let { comment, isOpenCommentModal, setIsOpenCommentModal, leagueId} = props;

  const blog = useSelector((state) => state.home.blog_dialog.blog);

  // const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const [description, setDescription] = useState("");

  const closeDialog = () => {
    setIsOpenCommentModal(false);
  };



  useEffect(() => {
    setDescription(comment.description);
  }, [comment])
  const updateRowsBasedOnScreenSize = () => {
    if (window.innerWidth < 768) {
      // Small screen
      return 4;
    } else {
      // Medium or larger screen
      return 9;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // Update rows when the window is resized
      const updatedRows = updateRowsBasedOnScreenSize();
      setRows(updatedRows);
    };

    // Initial setup
    const initialRows = updateRowsBasedOnScreenSize();
    setRows(initialRows);

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const [rows, setRows] = useState(9); // Default value for medium or larger screens

  const updateComment = () => {
    actions.updateComment(dispatch, {comment, description, leagueId})
    setIsOpenCommentModal(false);
  };

  return (
    <Transition.Root show={isOpenCommentModal} as={Fragment}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate w-[400px] sm:w-[500px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-16 sm:h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      Edit Comment
                    </p>
                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    <p className="dark:text-white text-black text-sm sm:text-base">
                      Comment:
                    </p>
                    <textarea
                      className="bg-transparent border border-dark-gray rounded-default text-xs p-default text-black dark:text-white resize-none outline-none"
                      placeholder="Enter the blog description"
                      rows={rows}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                        <button
                          onClick={updateComment}
                          className="bg-primary rounded-default w-full hover:bg-sky-600 text-white h-button mt-3"
                        >
                          Save
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

export default CommentModal;
