import React from "react";

const Button = (props) => {
  const { icon, className, children, ...rest } = props;
  return (
    <button className={`${className} text-black dark:text-white hover:text-white`} {...rest}>
      <div className={`flex h-full w-full px-2 py-2 space-x-2 items-center`}>
        {icon ? <img src={icon} alt="" /> : ""}
        <span className={`${icon ? "" : "flex-grow text-center"}`}>
          {children}
        </span>
      </div>
    </button>
  );
};

export default Button;
