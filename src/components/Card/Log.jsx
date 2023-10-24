import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../../utils/apis";
import league_logo from "../../assets/img/dark_mode/league-logo.png";
import editIconDark from "../../assets/img/dark_mode/edit-icon-dark.svg"
import editIconLight from "../../assets/img/dark_mode/edit-icon-light.svg"
import deleteIconDark from "../../assets/img/dark_mode/delete-icon-dark.svg"
import deleteIconLight from "../../assets/img/dark_mode/delete-icon-light.svg"

const Log = (props) => {
  const {id, period, time, result } = props;

  const darkMode = useSelector(state=>state.home.dark_mode);

  return (
    <div className="bg-light-charcoal dark:bg-[#595959] text-black dark:text-white rounded-lg h-28">
      <div className="flex justify-between">
        <div className="flex space-x-3 h-[51px] items-center p-4">
          <p className="text-black dark:text-white font-medium text-lg">P{period}</p>
          <p className="text-black dark:text-white font-medium text-lg">{time}</p>
          <p className="text-black dark:text-white font-medium text-lg">{result}</p>
        </div>
        <div className="flex space-x-3 h-[51px] items-center p-4">
          <img src={darkMode?editIconDark:editIconLight} alt="" className="w-4.5 h-4.5 cursor-pointer"/>
          <img src={darkMode?deleteIconDark:deleteIconLight} alt="" className="w-4.5 h-4.5 cursor-pointer"/>
        </div>
      </div>
      <hr className="border border-[#686868] w-full"/>
      <div className="flex justify-between">
        <div className="flex space-x-3 h-[51px] items-center p-4">
          <p className="text-black dark:text-white font-medium text-lg">+2</p>
          <p className="text-black dark:text-white font-medium text-lg">&gt;</p>
          <p className="text-black dark:text-white font-medium text-lg">#2</p>
          <p className="text-black dark:text-white font-medium text-lg">C.Ronaldo</p>
        </div>
        <div className="flex space-x-3 h-[51px] items-center p-4">
          <p className="text-black dark:text-[#686868] font-medium text-sm">Added by: A.B</p>

        </div>
      </div>
    </div>
  );
};

export default Log;
