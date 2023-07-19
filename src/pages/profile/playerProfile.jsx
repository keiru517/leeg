import React, { useState, useEffect } from "react";
import League from "../../components/league";
import search from "../../assets/img/search.png";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import ProfileTitle from "../../components/ProfileTitle";
import leftarrowIcon from "../../assets/img/left-arrow.png";
import player from "../../assets/img/player.png";

const PlayerProfile = () => {
  const leagues = [1, 2, 3, 4, 5, 6];

  const options = ["Sort by", "Ascend", "Descend", "Recent"];

  return (
    <div>
      <ProfileTitle
        backIcon={leftarrowIcon}
        avatar={player}
      >
        <div>
          <p className="text-[32px]">Tornike Shengelia</p>
          <span className="text-xs font-normal">Tornike@gmail.com</span>
        </div>
      </ProfileTitle>

      <p className="font-gray my-[20px]">
        2023 TABC Summer League &gt; Schedule &gt; Standings &gt; ManageRosters &gt; 
        <span className="text-sky-500"> Tornike Shengelia</span>
      </p>

      <div className="body overflow-auto mt-[20px]">
        <div className="search flex justify-between space-x-2">
          <Input
            icon={search}
            className="flex-grow"
            placeholder="Search Leagues"
          />
          <Select className="w-[144px]" options={options} />
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
