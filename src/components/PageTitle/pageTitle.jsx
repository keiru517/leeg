import React, { useState } from 'react';
import { useParams } from "react-router";

import { Link } from "react-router-dom";
import * as actions from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PageTitle = (props) => {

  const {
    backIcon,
    logo,
    editIcon,
    deleteIcon,
    button,
    className,
    children,
    createAction,
    ...rest
  } = props;

  let { id } = useParams();
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == id
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({type: createAction, payload:true})
  }
  
  const handleEdit = () => {
    dispatch({type: actions.OPEN_EDIT_LEAGUE_DIALOG, payload:league})
    // dispatch({type: actions.OPEN_CREATE_LEAGUE_DIALOG, payload:true});
    // dispatch({type: actions.UPDATE_LEAGUE_DIALOG_TYPE, payload:'edit'});

  }

  const navigate = useNavigate()



  return (
    <div className='page-title bg-charcoal flex items-center justify-between'>
      <div className='flex items-center'>
        {
          backIcon ? 
          // <Link to='/'>
            <img onClick={()=> navigate(-1)} src={backIcon} alt="" className='w-[34px] h-[34px] dark:hover:bg-middle-gray rounded-default cursor-pointer' />
          // </Link>
            : ""
        }
        {
          logo ? <img src={logo} alt="" className='w-20 h-20 mx-6' />
            : ""
        }
        <p className='text-3xl text-white text-left font-black mr-6'>{children}</p>
        {
          editIcon ?
            <img src={editIcon} alt="" className='w-5 h-5 cursor-pointer' onClick={handleEdit}/>
            :
            ""
        }
      </div>
      {
        button ? 
        <button onClick={handleClick} className="w-[169px] h-button bg-primary hover:bg-opacity-70 rounded-default text-white">
          {button}</button> :
          ""
      }

    </div>
  );
};

export default PageTitle