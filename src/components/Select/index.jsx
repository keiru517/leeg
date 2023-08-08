import { useState } from "react";
import downArrowFilled from "../../../src/assets/img/dark_mode/down-arrow-filled.png";
import downArrow from "../../../src/assets/img/dark_mode/down-arrow.png";

const Select = (props) => {
  const { icon, className, value, handleClick, options, children, ...rest } = props;

  const [expand, setExpand] = useState(false);

  const toggle = () => {
    setExpand(!expand);
  };

  const handleButtonClick = (data) => {
    setExpand(false);
    handleClick(data);
  };

  return (
    <div
      className={`${className} flex justify-between z-10 text-font-dark-gray rounded-lg shadow w-44 dark:bg-transparent border border-dark-gray relative items-center cursor-pointer select-none`}
      //   onClick={() => {
      //     setExpand(true)
      //   }}
    >
      <img src={icon} alt="" />
      <div
        className="w-full h-full flex justify-between items-center"
        onClick={toggle}
      >
        <span className="ml-4">{value}</span>
        <img src={downArrowFilled} alt="" className="mr-4 " />
      </div>
      <ul
        className={`py-2 text-sm text-gray-700 dark:text-gray-200 absolute top-14 bg-dark-gray w-full rounded-default${
          expand ? `` : " hidden"
        }`}
        aria-labelledby="states-button"
      >
        {options.map((option, idx) => {
          return (
            <li key={idx}>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-middle-gray dark:hover:text-white"
                onClick={() => handleButtonClick(option)}
              >
                <div className="inline-flex items-center">{option}</div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
