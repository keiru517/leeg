import React, { useState } from "react";
import Button from "../../components/Button";
import line from '../../assets/img/dark_mode/point-line.png';
import { useNavigate } from "react-router-dom";

const PageTitle = (props) => {
  const {
    backIcon,
    avatar,
    editIcon,
    deleteIcon,
    button,
    className,
    children,
    ...rest
  } = props;

  const navigate = useNavigate();

  return (
    <div className="page-title bg-charcoal flex items-center justify-between">
      <div className="flex items-center">
        {backIcon ? (
          <img src={backIcon} onClick={()=>navigate(-1)} alt="" className="w-[34px] h-[34px] dark:hover:bg-middle-gray rounded-default cursor-pointer" />
        ) : (
          ""
        )}
        {avatar ? <img src={avatar} alt="" className="w-20 h-20 mx-6" /> : ""}
        <p className="text-3xl text-white text-left font-black">{children}</p>
        {editIcon ? (
          <img src={editIcon} alt="" className="w-6 h-6 mr-[14px]" />
        ) : (
          ""
        )}
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
                <img src={line} alt="" className="mx-[19px]"/>
                <div className="h-full">
                    <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
                    <p className="text-base font-semibold">12.1</p>
                </div>
                <img src={line} alt="" className="mx-[19px]"/>
                <div className="h-full">
                    <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
                    <p className="text-base font-semibold">12.1</p>
                </div>
                <img src={line} alt="" className="mx-[19px]"/>
                <div className="h-full">
                    <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
                    <p className="text-base font-semibold">12.1</p>
                </div>
                <img src={line} alt="" className="mx-[19px]"/>
                <div className="h-full">
                    <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
                    <p className="text-base font-semibold">12.1</p>
                </div>
                <img src={line} alt="" className="mx-[19px]"/>

            </div>
        </div>
      </button>
    </div>
  );
};

export default PageTitle;
