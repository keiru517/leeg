import { useEffect, useRef, useState } from "react";
import downArrowFilled from "../../../src/assets/img/dark_mode/down-arrow-filled.png";
import { Link, useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import { useDispatch, useSelector } from "react-redux";
import toggleOn from "../../assets/img/dark_mode/toggle-on.png";
import toggleOff from "../../assets/img/dark_mode/toggle-off.png";
import * as actions from "../../actions";

const SettingsSelect = (props) => {
  const { icon, className, value } = props;
  const ref = useRef(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.home.user);

  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);

  const toggle = () => {
    setExpand(!expand);
  };

  const [darkMode, setDarkMode] = useState(
    localStorage.theme === "dark" ? true : false
  );

  const handleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  };

  useEffect(() => {
    dispatch({ type: actions.SET_DARK_MODE, payload: darkMode });
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleButtonClick = (data) => {
    setExpand(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin", { replace: true });
    setExpand(false);
  };

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpand(false); // Collapse the component
      }
    };

    // Add event listener for clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (user == {}) return <></>;

  return (
    <div
      ref={ref}
      className={`${className} flex justify-between dark:text-white text-font-dark-gray rounded-lg relative items-center cursor-pointer select-none`}
    >
      <div
        className="w-full h-full flex justify-between items-center"
        onClick={toggle}
      >
        <p className="dark:text-white mr-1">{value ? value : ""}</p>
        <img
          id="nav-avatar"
          src={user?.avatar}
          className="w-8 h-8 rounded-full border border-gray-500"
          alt=""
        />
        {/* <span className="ml-2">{value}</span> */}
        <img src={downArrowFilled} alt="" className="mr-2" />
      </div>
      <ul
        className={`w-[180px] p-2 text-sm z-30 text-gray-700 dark:text-gray-200 absolute right-0 top-12 bg-[#ebebeb] dark:bg-dark-gray rounded-default${
          expand ? `` : " hidden"
        }`}
        aria-labelledby="states-button"
      >
        <li key={0}>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-middle-gray dark:hover:text-white rounded-default"
            onClick={handleTheme}
            // onClick={()=>setDarkMode(!darkMode)}
          >
            <div className="inline-flex items-center mx-auto">
              <div className="flex items-center">
                Dark mode
                <img
                  src={darkMode ? toggleOn : toggleOff}
                  className="ml-3 w-8"
                  alt=""
                />
              </div>
            </div>
          </button>
        </li>
        <li key={1}>
          <Link to="/profile">
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-middle-gray dark:hover:text-white rounded-default"
              onClick={handleButtonClick}
            >
              <div className="inline-flex items-center mx-auto">
                <div className="flex items-center">Profile</div>
              </div>
            </button>
          </Link>
        </li>
        <li key={2}>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-middle-gray dark:hover:text-white rounded-default"
            onClick={handleLogOut}
          >
            <div
              className="inline-flex items-center mx-auto"
              // onClick={handleLogOut}
            >
              {/* <Link to="/signout"> */}
              Log out
              {/* </Link> */}
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSelect;
