import React, { useState, useEffect } from "react";
import League from "../../components/league";
import search from "../../assets/img/search.png";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import ProfileTitle from "../../components/ProfileTitle";
import leftarrowIcon from "../../assets/img/left-arrow.png";
import avatar from "../../assets/img/player.png";

const PlayerProfile = () => {
  const leagues = [1, 2, 3, 4, 5, 6];

  const seasons = ["Season Type", "Ascend", "Descend", "Recent"];
  const mode = ["Per Mode", "Ascend", "Descend", "Recent"];

  return (
    <div>
      <ProfileTitle backIcon={leftarrowIcon} avatar={avatar}>
        <div>
          <p className="text-[32px]">Tornike Shengelia</p>
          <span className="text-xs font-normal">Tornike@gmail.com</span>
        </div>
      </ProfileTitle>

      <p className="font-gray my-[20px]">
        2023 TABC Summer League &gt; Schedule &gt; Standings &gt; ManageRosters
        &gt;
        <span className="text-sky-500"> Tornike Shengelia</span>
      </p>
      <div className="flex w-full h-[78px] bg-nav rounded-[10px] ">
        <div className="w-1/5 border border-[#5B5E65] rounded-l-[10px] flex flex-col justify-center">
                <p className="text-white text-base text-center">Height</p>
                <p className="text-white text-base text-center">6"9"(2.06m)</p>
        </div>
        <div className="w-1/5 border border-[#5B5E65]  flex flex-col justify-center">
                <p className="text-white text-base text-center">Weight</p>
                <p className="text-white text-base text-center">255lb (116kg)</p>
        </div>
        <div className="w-1/5 border border-[#5B5E65] flex flex-col justify-center">
                <p className="text-white text-base text-center">Country</p>
                <p className="text-white text-base text-center">Georgia</p>
        </div>
        <div className="w-1/5 border border-[#5B5E65] flex flex-col justify-center">
                <p className="text-white text-base text-center">Age</p>
                <p className="text-white text-base text-center">25 Years</p>
        </div>
        <div className="w-1/5 border border-[#5B5E65] rounded-r-[10px] flex flex-col justify-center">
                <p className="text-white text-base text-center">Birthdate</p>
                <p className="text-white text-base text-center">July 18, 1977</p>
        </div>
      </div>        

      <div className="rounded-main overflow-auto mt-5 p-[26px]">
        <div className="search flex justify-between space-x-2">
          <Select className='w-1/2 rounded-lg' options={seasons} /> 
          <Select className="w-1/2 rounded-lg" options={mode} />
        </div>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leagues?.map((lg) => (
            <League />
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
