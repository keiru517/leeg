import React, {useState} from 'react';
import logo from '../assets/img/Avatar.png';
import profile from '../assets/img/profile.png';
import downarrow from '../assets/img/down-arrow.png';
import line from '../assets/img/line.png';

const Nav = () => {

  return (
        <div className='nav flex items-center justify-between'>
            <div className='title flex items-center space-x-8'>
                <div className='logo flex'>
                    <div className='flex'>
                        <img src={logo}></img>
                        <p className='text-white text-base text-left italic font-semibold mx-3'>Leeg.io</p>
                    </div>
                </div>
                <img src={line}></img>
                <div className='greeting'>
                    <p className='text-white text-lg font-semibold text-left'>Hello George!</p>
                    <p className='text-white text-sm font-gray text-left'>Welcome to your dashboard</p>
                </div>
            </div>
            <div className='profile flex items-center justify-between space-x-2'>
                <img src={profile} className=''></img>
                <p className='profile-name text-sm text-white'>George Chichua</p>
                <img src={downarrow} className='mt-1'></img>
            </div>

        </div>
  );
};

export default Nav