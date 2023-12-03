import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import optionIconDark from '../../assets/img/dark_mode/option-icon-dark.png'
import optionIconLight from '../../assets/img/dark_mode/option-icon-light.png'
const Option = (props) => {
  const { icon, className, value, handleClick, options, children, ...rest } =
    props;

  const ref = useRef(null);
  const darkMode = useSelector((state) => state.home.dark_mode);
  const [expand, setExpand] = useState(false);

  const toggle = () => {
    setExpand(!expand);
  };

  const handleButtonClick = (idx, event) => {
    event.preventDefault();
    setExpand(false);
    handleClick(idx);
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
      className={`${className}  rounded-full w-8 h-8 items-center flex mx-auto relative cursor-pointer`}
      onClick={toggle}
    >
      <img
        src={
          darkMode
            ? optionIconDark
            : optionIconLight
        }
        alt=""
        className="mx-auto "
      />
      <ul
        className={`p-2 text-sm text-gray-700 dark:text-gray-200 absolute top-8 bg-[#ebebeb] dark:bg-light-gray w-[120px] rounded-default right-0 z-50 ${
          expand ? `` : " hidden"
        }`}
        aria-labelledby="states-button"
      >
        {options.map((option, idx) => {
          return (
            <li key={idx}>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-middle-gray dark:hover:text-white rounded-default"
                onClick={(event) => handleButtonClick(idx, event)}
              >
                <div className="inline-flex items-center">{option.name}</div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Option;