import { useEffect, useState } from "react";
import downArrowFilled from "../../../src/assets/img/dark_mode/down-arrow-filled.png";
import downArrow from "../../../src/assets/img/dark_mode/down-arrow.png";
import settingsIcon from "../../assets/img/dark_mode/Setting.png";
import { Link, useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import { useSelector } from "react-redux";

const SettingsSelect = (props) => {
  const { icon, className, value } = props;

  const user = useSelector(state=>state.home.user);

  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);

  const toggle = () => {
    setExpand(!expand);
  };

  const handleButtonClick = (data) => {
    setExpand(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin", { replace: true });
  };

  return (
    <div
      className={`${className} flex justify-between z-10 text-font-dark-gray rounded-lg shadow w-44  border border-dark-gray relative items-center cursor-pointer select-none`}
      //   onClick={() => {
      //     setExpand(true)
      //   }}
    >
      <img src={apis.userAvatarURL(localStorage.getItem('userId'))} className="w-8 h-8 rounded-lg" alt="" />
      <div
        className="w-full h-full flex justify-between items-center"
        onClick={toggle}
      >
        <span className="ml-2">{value}</span>
        <img src={downArrowFilled} alt="" className="mr-2" />
      </div>
      <ul
        className={`w-[200px] p-2 text-sm text-gray-700 dark:text-gray-200 absolute right-0 top-12 bg-dark-gray rounded-default${
          expand ? `` : " hidden"
        }`}
        aria-labelledby="states-button"
      >
        <li key={0}>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-middle-gray dark:hover:text-white rounded-default"
            onClick={handleButtonClick}
          >
            <div className="inline-flex items-center mx-auto">
              <Link to="/profile">
                <div className="flex items-center">
                  {user.firstName} {user.lastName}
                </div>
              </Link>
            </div>
          </button>
        </li>
        {/* <li key={1}>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-middle-gray dark:hover:text-white rounded-default"
            onClick={handleButtonClick}
          >
            <div className="inline-flex items-center">
              <Link to="/profile">
                <div className="flex items-center">
                  <img src={settingsIcon} className="mr-3" alt="" />
                  Settings
                </div>
              </Link>
            </div>
          </button>
        </li> */}
        <li key={2}>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-middle-gray dark:hover:text-white rounded-default"
            onClick={handleButtonClick}
          >
            <div
              className="inline-flex items-center mx-auto"
              onClick={handleLogOut}
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
