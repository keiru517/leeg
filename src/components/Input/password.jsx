import { useState } from "react";
import eyeDisable from "../../assets/img/dark_mode/eye-disable.png";
import eyeEnable from "../../assets/img/dark_mode/eye-enable.png";

const PasswordInput = (props) => {
  const [isShown, setIsShown] = useState(false);
  const toggle = () => {
    setIsShown(!isShown);
  };

  const { icon, className, value, ...rest } = props;
  return (
    <div
      className={`${className} flex space-x-2 border border-dark-gray items-center`}
    >
      {icon ? (
        <div>
          <img src={icon} className="w-3.5 h-3.5" alt="" />
        </div>
      ) : (
        ""
      )}
      <input
        {...rest}
        type={isShown?"":"password"}
        className="bg-transparent outline-none text-black dark:text-white flex-grow h-[42px] px-3"
        value={value}
      />
      <div>
        <img
          onClick={toggle}
          src={isShown ? eyeEnable : eyeDisable}
          alt=""
          className="hover:cursor-pointer pr-3 bg-transparent"
        />
      </div>
    </div>
  );
};

export default PasswordInput;
