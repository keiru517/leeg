import React, { useState, useEffect, useRef } from "react";

const TimePicker = (props) => {
  const { className, initialTime, setTime } = props;

  const inputRef = useRef(null);
  const [timer, setTimer] = useState(initialTime);
  const [length, setLength] = useState(initialTime.toString().length);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setTimer(e.target.value % 10000);
    setTime(e.target.value % 10000);
    setLength((e.target.value % 10000).toString().length);
    console.log((e.target.value % 10000).toString().length);
  };

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsEdit(false);
      }
    };

    // Add event listener for clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    console.log("clcked");
    setIsEdit(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`${className} flex`}>
      <div className=" cursor-pointer" onClick={handleClick}>
        <span
          className={`text-4xl ${length > 3 ? "text-white" : "text-[#5f6368]"}`}
          tabindex="0"
        >
          {Math.floor(timer / 1000)}
        </span>
        <span
          className={`text-4xl ${length > 2 ? "text-white" : "text-[#5f6368]"}`}
        >
          {Math.floor((timer / 100) % 10)}
        </span>
        <span
          className={`text-xl ${
            length > 2 ? "text-white" : "text-[#5f6368]"
          } mr-3`}
        >
          m
        </span>
        <span
          className={`text-4xl ${length > 1 ? "text-white" : "text-[#5f6368]"}`}
          tabindex="0"
        >
          {Math.floor((timer % 100) / 10)}
        </span>
        <span
          className={`text-4xl ${
            length > 0 && timer !== 0 ? "text-white" : "text-[#5f6368]"
          }
          ${isEdit ? "border-white border-r" : ""}
          `}
          tabindex="0"
        >
          {timer % 10}
        </span>
        <span
          className={`text-xl ${timer === 0 ? "text-[#5f6368]" : "text-white"}`}
        >
          s
        </span>
      </div>

      <input
        ref={inputRef}
        type="number"
        className="w-0 bg-transparent text-transparent border-none outline-none none"
        value={timer}
        onChange={handleChange}
      />

      {/* <div className="flex bg-[#202124] cursor-pointer">
        <input
          className={`w-full text-4xl bg-transparent ${length > 3 ? "text-white" : "text-[#5f6368]"}`}
          tabindex="0"
          value={Math.floor(timer / 1000)}
        />
          
        <input
          className={`w-full text-4xl bg-transparent ${length > 2 ? "text-white" : "text-[#5f6368]"}`}
          value={Math.floor((timer / 100) % 10)}
        />
        <span
          className={`text-xl ${length > 2 ? "text-white" : "text-[#5f6368]"} mr-3`}
        >
          m
        </span>
        <input
          className={`w-full text-4xl bg-transparent ${length > 1 ? "text-white" : "text-[#5f6368]"}`}
          tabindex="0"
          value={Math.floor((timer % 100) / 10)}
        />
        <input
          className={`w-full text-4xl bg-transparent ${
            length > 0 && timer !== 0 ? "text-white" : "text-[#5f6368]"
          }
          ${isEdit?"border-white border-r":""}
          `}
          tabindex="0"
          value={timer % 10}
          />
        <span
          className={`text-xl ${timer === 0 ? "text-[#5f6368]" : "text-white"}`}
        >
          s
        </span>
      </div> */}
    </div>
  );
};

export default TimePicker;
