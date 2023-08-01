import React, { useState } from 'react';
import { useParams } from "react-router";

import Button from '../Button';
import { Link } from "react-router-dom";
import * as actions from '../../actions';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch({type: actions.OPEN_LEAGUE_DIALOG, payload:true});
    dispatch({type: actions.UPDATE_LEAGUE_DIALOG_TYPE, payload:'edit'});

  }

  return (
    <div className='page-title bg-charcoal flex items-center justify-between'>
      <div className='flex items-center'>
        {
          backIcon ? 
          <Link to='/'>
            <img src={backIcon} alt="" className='w-[34px] h-[34px] dark:hover:bg-middle-gray rounded-default cursor-pointer' />
          </Link>
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
        button ? <Button createAction={createAction} className="w-[169px] h-[53px] bg-primary hover:bg-sky-600 rounded-default">
          {button}</Button> :
          ""
      }

    </div>
  );
};

export default PageTitle
