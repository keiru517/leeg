import { useRef, useState, useEffect } from "react";
import downArrowFilled from "../../../src/assets/img/dark_mode/down-arrow-filled.png";

const SelectPoints = (props) => {
  const {
    icon,
    className,
    value,
    handleClick,
    options,
    children,
    ...rest
  } = props;

  const ref = useRef(null);
  const [expand, setExpand] = useState(false);

  const toggle = () => {
    setExpand(!expand);
  };

  const handleButtonClick = (data) => {
    setExpand(false);
    handleClick(data);
  };

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpand(false); // Collapse the component
      }
    };

    // Add event listener for clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} flex justify-between z-20 text-black dark:text-white rounded-default shadow w-44 dark:bg-transparent border border-dark-gray relative items-center cursor-pointer select-none`}
      //   onClick={() => {
      //     setExpand(true)
      //   }}
    >
      <img src={icon} alt="" />
      <div
        className="w-full h-full flex justify-between items-center"
        onClick={toggle}
      >
        <span className="ml-4 truncate w-full">{value}</span>
        <img src={downArrowFilled} alt="" className="mr-4" />
      </div>
      <ul
        className={`p-2 text-sm text-gray-700 dark:text-white absolute top-8 bg-[#ebebeb] dark:bg-light-gray w-full rounded-default ${
          expand ? `` : " hidden"
        }`}
        aria-labelledby="states-button"
      >
        {options.map((option, idx) => {
          return (
            <li key={idx}>
              <button
                type="button"
                className="inline-flex w-full px-2 sm:px-4 py-0 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-middle-gray dark:hover:text-white rounded-sm"
                onClick={() => handleButtonClick(option)}
              >
                <div className="inline-flex items-center truncate w-full text-xs">{option.name}</div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectPoints;