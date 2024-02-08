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
import EditorComponent from "../Editor";

const BlogModal = (props) => {
  const dispatch = useDispatch();
  let { userId, leagueId } = props;
  const darkMode = useSelector((state) => state.home.dark_mode);

  const status = useSelector((state) => state.home.blog_dialog.open);
  const type = useSelector(state => state.home.blog_dialog.type);
  const blog = useSelector((state) => state.home.blog_dialog.blog);

  // const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(null);

  const closeDialog = () => {
    setTitle("");
    dispatch({ type: actions.CLOSE_BLOG_DIALOG, payload: false });
  };



  useEffect(() => {
    // if (!!blog.description) {
      setTitle(blog.title);
      // setDescription(JSON.parse(blog.description));
    // }
  }, [blog])
  const updateRowsBasedOnScreenSize = () => {
    if (window.innerWidth < 768) {
      // Small screen
      return 6;
    } else {
      // Medium or larger screen
      return 17;
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

  const [rows, setRows] = useState(18); // Default value for medium or larger screens

  const createBlog = () => {
    console.log("description", description)
    if (title === "") {
      alert("Please type title and description!");
    } else {
      actions.createBlog(dispatch, { leagueId, userId, title, description })
      closeDialog()
    }
  };

  const updateBlog = () => {
    if (title === "" || description === "") {
      alert("Please type title and description!");
    } else {
      actions.updateBlog(dispatch, { id: blog?.id, leagueId, title, description })
      closeDialog()
    }
  };

  const handleDelete = () => {
    actions.deleteBlog(dispatch, { blogId: blog.id, leagueId: leagueId })
    closeDialog()
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[620px]  sm:h-[609px] w-[400px] sm:w-[500px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-16 sm:h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      {type === "create" ? "Create" : "Edit"} Blog
                    </p>
                    <div className="flex items-center">

                      {
                        type === "edit" ? (
                          <img
                            src={darkMode ? deleteIconDark : deleteIconLight}
                            alt=""
                            className="w-[18px] h-[18px] mr-5 hover:opacity-70 cursor-pointer"
                            onClick={handleDelete}
                          />
                        ) : (
                          ""
                        )
                      }
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    <div>
                      <p className="dark:text-white text-black text-sm sm:text-base">
                        Title:
                      </p>
                      <Input
                        className="rounded-default text-xs"
                        placeholder="Enter the blog title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      ></Input>
                      <p className="dark:text-white text-black text-sm sm:text-base mt-3">
                        Description:
                      </p>
                        <EditorComponent
                          className="h-52 sm:h-64"
                          setDescription={setDescription}
                          description={blog.description}
                        />
                    </div>
                    {
                      type === "create" ?
                        <button
                          onClick={createBlog}
                          className="bg-primary rounded-default w-full hover:bg-sky-600 text-white h-button"
                        >
                          Create
                        </button>
                        :
                        <button
                          onClick={updateBlog}
                          className="bg-primary rounded-default w-full hover:bg-sky-600 text-white h-button"
                        >
                          Save
                        </button>

                    }
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

export default BlogModal;
