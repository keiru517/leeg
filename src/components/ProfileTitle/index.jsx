import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import line from "../../assets/img/dark_mode/point-line.png";
import backIconDark from "../../assets/img/dark_mode/back-icon-dark.png";
import backIconLight from "../../assets/img/dark_mode/back-icon-light.png";

const PageTitle = (props) => {
  const {
    team,
    avatar,
    editIcon,
    deleteIcon,
    button,
    className,
    children,
    ...rest
  } = props;

  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.home.dark_mode);

  return (
    <div className="page-title bg-white dark:bg-charcoal flex items-center justify-between mt-3 p-3">
      <div className="flex items-center">
        <div
          className="w-[34px] h-[34px] bg-gray-300 dark:bg-primary items-center flex justify-center rounded-default cursor-pointer hover:opacity-70"
          onClick={() => navigate(-1)}
        >
          <img
            src={darkMode ? backIconDark : backIconLight}
            alt=""
            className="w-[4px] h-[10px] dark:hover:bg-middle-gray rounded-default cursor-pointer"
          />
        </div>
        {avatar ? (
          <img src={avatar} alt="" className="w-20 h-20 mx-6 rounded-default" />
        ) : (
          ""
        )}
        <p className="text-3xl text-white text-left font-black">{children}</p>
        {deleteIcon ? <img src={deleteIcon} alt="" className="w-6 h-6" /> : ""}
      </div>
      <button className="w-[377px] h-[102px] bg-primary rounded-default hover:opacity-70 text-white">
        <div className="w-[297px] mx-auto">
          <p className="text-xl font-semibold">Season Averages</p>
          <div className="flex full h-[35px]">
            <div className="h-full">
              <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
              <p className="text-base font-semibold">12.1</p>
            </div>
            <img src={line} alt="" className="mx-[19px]" />
            <div className="h-full">
              <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
              <p className="text-base font-semibold">12.1</p>
            </div>
            <img src={line} alt="" className="mx-[19px]" />
            <div className="h-full">
              <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
              <p className="text-base font-semibold">12.1</p>
            </div>
            <img src={line} alt="" className="mx-[19px]" />
            <div className="h-full">
              <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
              <p className="text-base font-semibold">12.1</p>
            </div>
            <img src={line} alt="" className="mx-[19px]" />
            <div className="h-full">
              <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
              <p className="text-base font-semibold">12.1</p>
            </div>
            <img src={line} alt="" className="mx-[19px]" />
          </div>
        </div>
      </button>
    </div>
  );
};

export default PageTitle;
