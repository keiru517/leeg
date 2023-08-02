import React from "react";
import * as actions from '../../actions';
import { useDispatch } from "react-redux";

const Button = (props) => {
  const { icon, className, children, onClick, createAction, ...rest } = props;
  const dispatch = useDispatch()

  const handleClick = () => {
    console.log("clicked button")
    // dispatch({type:actions.UPDATE_DIALOG_TYPE, payload: 'create'})
    // dispatch({type:createAction, payload: true})
    
  }
  return (
    <button onClick={handleClick} className={`${className} text-white`} {...rest}>
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
