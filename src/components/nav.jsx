import React from "react";
import logo from "../assets/img/dark_mode/logo.png";
import line from "../assets/img/dark_mode/line.png";
import SettingsSelect from "../components/Select/settings";
import { useSelector } from "react-redux";

const Nav = () => {
  const user = useSelector(state=>state.home.user);

  return (
    <div className="dark:bg-slate  bg-white p-default rounded-main h-10 flex items-center justify-between">
      <div className="title flex items-center space-x-8">
        <div className="logo flex">
          <div className="flex">
            <img src={logo}></img>
            <p className="dark:text-white text-[#33383F] text-base text-left italic font-semibold mx-3">
              Leeg.io
            </p>
          </div>
        </div>
        <img src={line}></img>
        {/* <div className="greeting">
          <p className="dark:text-white text-[#33383F] text-lg font-semibold text-left">
            Hello George!
          </p>
          <p className="text-sm dark:text-font-dark-gray text-left">
            Welcome to your dashboard
          </p>s
        </div> */}
      </div>
      <div className="flex space-x-2 items-center">
        <SettingsSelect
          className="h-10 pl-3 dark:bg-charcoal"
          value={user?.firstName?.[0] + user?.lastName?.[0]}
        />
      </div>
    </div>
  );
};

export default Nav;
