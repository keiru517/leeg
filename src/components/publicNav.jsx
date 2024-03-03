import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/img/dark_mode/logo.png";
import { Link } from "react-router-dom";
import toggleOn from "../../src/assets/img/dark_mode/toggle-on.png"
import toggleOff from "../../src/assets/img/dark_mode/toggle-off.png"
import darkSun from "../../src/assets/img/dark_mode/dark-sun.svg";
import lightSun from "../../src/assets/img/dark_mode/light-sun.svg";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";

const PublicNav = () => {
  const dispatch = useDispatch();

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

  return (
    <div className="dark:bg-slate bg-white py-1  flex items-center justify-between">
      <div className="title flex items-center space-x-8 px-3">
        <div className="logo flex">
          <div className="flex">
            <Link to={'/signupWithEmail'} className="flex">
              <img src={logo}></img>
              <p className="dark:text-white text-[#33383F] text-base text-left italic font-semibold mx-3">
                Leeg.io
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex space-x-2 items-center mr-3">
        <Link
        className="text-sky-500"
        to={"/signin"}
        >
          Sign In
        </Link>
        <span className="dark:text-white text-black">
          /
        </span>
        <Link
        className="text-sky-500"
        to={"/signupWithEmail"}
        >
          Sign Up
        </Link>
        <span className="text-sky-500">
        </span>
        <div className="inline-flex items-center mx-auto"
        >
          <div className="flex items-center">
            <img
              className="hover:cursor-pointer ml-3 w-5"
              src={darkMode ? lightSun : darkSun}
              alt=""
              onClick={handleTheme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicNav;