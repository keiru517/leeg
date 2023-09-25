import { Switch } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import apis from "../../utils/apis";

function Checkbox({ label, name, checked, onChange, disabled }) {
  return (
    <Switch.Group>
      <div className="flex items-center justify-between">
        <Switch.Label className="mr-4">{label}</Switch.Label>
        <Switch
          checked={checked}
          onChange={onChange}
          name={name}
          disabled={disabled}
          className={`
            relative flex h-5 w-5 items-center justify-center transition-all duration-200 outline-none ring-1 
            ${!checked && !disabled ? "ring-gray-400" : ""}
            ${checked && !disabled ? "ring-red-400" : ""} 
            ${disabled ? "bg-gray-200 ring-gray-200" : ""}  
          `}
        >
          <AiOutlineCheck
            size="1rem"
            className={`
             ${checked ? "scale-100" : "scale-0"} 
             ${checked && !disabled ? "text-red-400" : "text-gray-400"} 
             transition-transform duration-200 ease-out`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}

const ListItem = (props) => {

  const {
    className,
    avatar,
    name,
    email,
    date,
    itemChecked,
    setItemChecked,
  } = props;

  return (
    <div className={`${className} w-full`}>
      <div className="flex items-center justify-between bg-[#e6e6e6] dark:bg-dark-gray w-full h-14 rounded-default py-1.5 px-4">
        <div className="flex">
          <img src={avatar} className="w-10 h-10 mr-3 rounded-default" alt="" />
          <div>
            <p className="text-black dark:text-white text-base underline">{name}</p>
            <div className="flex">
              <p className="text-black dark:text-white text-xs font-dark-gray">{email}</p>
              <p className="text-black dark:text-white text-xs font-dark-gray ml-3">{date}</p>
            </div>
          </div>
        </div>
        <Checkbox
          name="name"
          checked={!!itemChecked}
          onChange={setItemChecked}
        />
      </div>
    </div>
  );
};

export default ListItem;
