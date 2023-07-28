import React, {useState} from 'react';
import logo from '../assets/img/dark_mode/Avatar.png';
import profile from '../assets/img/dark_mode/profile.png';
import downArrow from '../assets/img/dark_mode/down-arrow.png';
import line from '../assets/img/dark_mode/line.png';
import darkMode from '../assets/img/dark-mode.png';
import lightMode from '../assets/img/light-mode.png';
import Select from '../components/Select';

const Nav = () => {

    const options = [
        'Settings',
        'Log out'
    ]

    // true if dark mode
    const [mode, setMode] = useState(true);

    const toggle = () => {
        setMode(!mode);
    }
  return (
        <div className='dark:bg-slate p-default rounded-main h-[99px] flex items-center justify-between'>
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
                    <p className='text-white text-sm font-dark-gray text-left'>Welcome to your dashboard</p>
                </div>
            </div>
            <div className='flex space-x-2 items-center'>
                {/* <Select options={options}>George Chichua</Select> */}

                <img src={mode?darkMode:lightMode} alt="" className='w-6 h-6 rounded-full dark:hover:bg-dark-gray cursor-pointer' onClick={toggle}/>
                <div className='profile flex items-center justify-between space-x-2'>
                    <img src={profile} className=''></img>
                    <p className='profile-name text-sm text-white'>George Chichua</p>
                    <img src={downArrow} className='mt-1'></img>
                </div>
            </div>

        </div>
  );
};

export default Nav