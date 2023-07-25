import { Switch } from "@headlessui/react";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

function Checkbox1({ label, name, checked, onChange, disabled }) {
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
            relative flex h-6 w-6 items-center justify-center transition-all duration-200 outline-none ring-1 
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
  const [itemOnechecked, setItemOneChecked] = useState(false);
  const [itemTwochecked, setItemTwoChecked] = useState(false);
  const [itemThreechecked, setItemThreeChecked] = useState(false);
  const [itemFourchecked, setItemFourChecked] = useState(true);

  const { className, avatar, name, email, date, children } = props;
  return (
    <div className={`${className} w-full`}>
      <div className="flex items-center justify-between bg-dark-gray w-full h-14 rounded-default py-1.5 px-4">
        <div className="flex">
          <img src={avatar} className="w-10 h-10 mr-3" alt="" />
          <div>
            <p className="text-white text-base underline">{name}</p>
            <div className="flex">
              <p className="text-white text-xs font-gray">{email}</p>
              <p className="text-white text-xs font-gray">{date}</p>
            </div>
          </div>
        </div>
        <Checkbox1
          name="name"
          checked={itemOnechecked}
          onChange={setItemOneChecked}
        />
      </div>
    </div>
  );
};

export default ListItem;
