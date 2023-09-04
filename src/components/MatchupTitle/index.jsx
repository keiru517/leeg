import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import backIcon from "../../assets/img/dark_mode/left-arrow.png";

const MatchupTitle = (props) => {
  const { children, handleClick, result } = props;
  const navigate = useNavigate();

  return (
    <div className="page-title dark:bg-charcoal bg-white flex items-center justify-between">
      <div className="flex items-center">
        <img
          onClick={() => navigate(-1)}
          src={backIcon}
          alt=""
          className="w-[34px] h-[34px] dark:hover:bg-middle-gray rounded-default cursor-pointer"
        />
        <p className="text-3xl dark:text-white text-charcoal text-left font-black mx-6">
          {children}
        </p>
      </div>
      <button
        onClick={handleClick}
        className="w-[169px] h-button bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 disabled:opacity-10"
        disabled={result!=="-:-"}
      >
        Mark As Finished
      </button>
    </div>
  );
};

export default MatchupTitle;
