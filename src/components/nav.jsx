import React, { useState } from "react";
import logo from "../assets/img/dark_mode/logo.png";
import profile from "../assets/img/dark_mode/profile.png";
import downArrow from "../assets/img/dark_mode/down-arrow.png";
import line from "../assets/img/dark_mode/line.png";
import darkMode from "../assets/img/dark-mode.png";
import lightMode from "../assets/img/light-mode.png";
import SettingsSelect from "../components/Select/settings";
import { Link } from "react-router-dom";

const Nav = () => {
  const options = [
    { id: 1, name: "Settings" },
    { id: 2, name: "Log out" },
  ];

  // true if dark mode
  const [mode, setMode] = useState(false);

  const toggle = () => {
    setMode(!mode);
  };

  const [option, setOption] = useState('');

  return (
    <div className="dark:bg-slate  bg-white p-default rounded-main h-[99px] flex items-center justify-between">
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
        <div className="greeting">
          <p className="dark:text-white text-[#33383F] text-lg font-semibold text-left">
            Hello George!
          </p>
          <p className="text-sm dark:text-font-dark-gray text-left">
            Welcome to your dashboard
          </p>
        </div>
      </div>
      <div className="flex space-x-2 items-center">

        <img
          src={mode ? darkMode : lightMode}
          alt=""
          className="w-6 h-6 rounded-full dark:hover:bg-dark-gray cursor-pointer"
          onClick={toggle}
        />
        <SettingsSelect
          className="h-11 pl-3 w-[199px] text-white dark:bg-charcoal"
          value="George Chichua"
          icon={profile}
        >
          
        </SettingsSelect>
        {/* <Link to="/profile">
          <div className="dark:bg-charcoal bg-[#EBEBEB] h-11 rounded-lg p-3 flex items-center justify-between space-x-2 cursor-pointer">
            <img src={profile} className="w-8 h-8 rounded-lg"></img>
            <p className="h-4.5 text-sm dark:text-white text-[#33383F]">
              George Chichua
            </p>
            <img src={downArrow} className="mt-1"></img>
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Nav;
