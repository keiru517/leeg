import React from 'react';
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from '../../assets/img/dark_mode/hr-line.png';
import { useNavigate } from 'react-router-dom';


const Signin1 = () => {

    const navigate = useNavigate();

    return (
        <div className=''>
            <div className='w-[441px] h-[441px] mx-auto mt-32'>
            <div className="w-[164px] h-[185px] mx-auto">
          <div className="flex w-[112px] h-[112px] bg-white dark:bg-slate rounded-full items-center mx-auto">
            <img src={logo} alt="logo" className="mx-auto w-[38px] h-[38px]" />
          </div>
          <img src={hrLine} alt="" className="my-7" />
          <p className="text-font-light-gray text-sm text-center">LEEG.IO</p>
        </div>
                <div className='bg-slate w-full h-48 mt-16 rounded-main p-default flex flex-col'>
                    <div>
                        <p className='text-white text-2xl font-bold'>Sign in</p>
                        <p className='text-font-light-gray mt-3'>Sign in to access your account.</p>
                    </div>
                    <div className='flex justify-between mt-auto'>
                        <button onClick={()=>navigate('/signin')} className='w-[180px] h-button bg-[#e5e5e5] text-charcoal dark:bg-[#313435] dark:text-white font-bold rounded-default hover:bg-opacity-70'>Admin</button>
                        <button className='w-[180px] h-button bg-[#e5e5e5] text-charcoal dark:bg-[#313435] dark:text-white font-bold rounded-default hover:bg-opacity-70'>Player</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin1
