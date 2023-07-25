import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Select from "../../components/Select";
import ProfileTitle from "../../components/ProfileTitle";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import avatar from "../../assets/img/dark_mode/player.png";

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
      <div className="flex w-full h-[78px] bg-slate rounded-[10px] ">
        <div className="w-1/5 border border-light-gray rounded-l-[10px] flex flex-col justify-center">
                <p className="text-white text-base text-center">Height</p>
                <p className="text-white text-base text-center">6"9"(2.06m)</p>
        </div>
        <div className="w-1/5 border border-light-gray  flex flex-col justify-center">
                <p className="text-white text-base text-center">Weight</p>
                <p className="text-white text-base text-center">255lb (116kg)</p>
        </div>
        <div className="w-1/5 border border-light-gray flex flex-col justify-center">
                <p className="text-white text-base text-center">Country</p>
                <p className="text-white text-base text-center">Georgia</p>
        </div>
        <div className="w-1/5 border border-light-gray flex flex-col justify-center">
                <p className="text-white text-base text-center">Age</p>
                <p className="text-white text-base text-center">25 Years</p>
        </div>
        <div className="w-1/5 border border-light-gray rounded-r-[10px] flex flex-col justify-center">
                <p className="text-white text-base text-center">Birthdate</p>
                <p className="text-white text-base text-center">July 18, 1977</p>
        </div>
      </div>        

      <div className="rounded-main bg-slate overflow-auto mt-5 p-[26px]">
        <div className="search flex justify-between space-x-6">
          <Select className='w-1/2 rounded-lg' options={seasons} /> 
          <Select className="w-1/2 rounded-lg" options={mode} />
        </div>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leagues?.map((lg) => (
            <Card />
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
