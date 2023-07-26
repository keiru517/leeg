import { useState } from "react";
import downArrowFilled from "../../../src/assets/img/dark_mode/down-arrow-filled.png";
import downArrow from "../../../src/assets/img/dark_mode/down-arrow.png";

const Select = (props) => {
  const { icon, className, options, children, ...rest } = props;

  const [sort, setSort] = useState(children);
  const [expand, setExpand] = useState(false);

  const handleClick = (data) => {
    setExpand(false);
    setSort(data);
  };

  return (
    <div
      class={`${className} flex justify-between z-10 text-font-dark-gray rounded-lg shadow w-44 dark:bg-transparent border border-charcoal relative items-center cursor-pointer`}
    //   onClick={() => {
    //     setExpand(true)
    //   }}
    >
      <span className="ml-4">{sort}</span>
        <img
          src={downArrowFilled}
          alt=""
          className="mr-4 "
          onClick={() => {
            setExpand(true);
          }}
        />
      <ul
        class={
          expand
            ? "py-2 text-sm text-gray-700 dark:text-gray-200 absolute top-14 bg-dark-gray w-full rounded-default"
            : "py-2 text-sm text-gray-700 dark:text-gray-200 absolute top-14 bg-dark-gray w-full rounded-default hidden"
        }
        aria-labelledby="states-button"
      >
        {options.map((option) => {
          return (
            <li>
              <button
                type="button"
                class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-middle-gray dark:hover:text-white"
                onClick={() => handleClick(option)}
              >
                <div class="inline-flex items-center">{option}</div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
