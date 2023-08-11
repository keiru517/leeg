import React from 'react';
import { useParams } from "react-router";

import * as actions from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PageTitle = (props) => {

  const {
    backIcon,
    logo,
    editIcon,
    button,
    children,
    createAction,
  } = props;

  let { id } = useParams();
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id === id
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({type: createAction, payload:true})
  }
  
  const handleEdit = () => {
    dispatch({type: actions.OPEN_EDIT_LEAGUE_DIALOG, payload:league})
  }

  const navigate = useNavigate()



  return (
    <div className='page-title bg-charcoal flex items-center justify-between'>
      <div className='flex items-center'>
        {
          backIcon ? 
            <img onClick={()=> navigate(-1)} src={backIcon} alt="" className='w-[34px] h-[34px] dark:hover:bg-middle-gray rounded-default cursor-pointer' />
            : ""
        }
        {
          logo ? <img src={logo} alt="" className='w-20 h-20 ml-6' />
            : ""
        }
        <p className='text-3xl text-white text-left font-black mx-6'>{children}</p>
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
