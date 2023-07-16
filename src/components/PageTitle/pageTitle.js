import React, { useState } from 'react';
import Button from '../../components/Button';

const PageTitle = (props) => {

  const {
    backIcon,
    logo,
    editIcon,
    deleteIcon,
    button,
    className,
    children,
    ...rest
  } = props;

  return (
    <div className='page-title flex items-center justify-between'>
      <div className='flex items-center'>
        {
          backIcon ? <img src={backIcon} alt="" className='w-[34px] h-[34px]' />
            : ""
        }
        {
          logo ? <img src={logo} alt="" className='w-20 h-20 mx-6' />
            : ""
        }
        <p className='text-3xl text-white text-left font-black'>{children}</p>
        {
          editIcon ? <img src={editIcon} alt="" className='w-6 h-6 mr-[14px]' />
            :
            ""
        }
        {
          deleteIcon ? <img src={deleteIcon} alt="" className='w-6 h-6' />
            :
            ""
        }
      </div>
      {
        button ? <Button className="w-[169px]">
          {button}</Button> :
          ""
      }

    </div>
  );
};

export default PageTitle
