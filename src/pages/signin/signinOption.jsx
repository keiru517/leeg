import React, {useState, useEffect} from 'react';
import logo from '../../assets/img/dark_mode/logo.png';
import hrLine from '../../assets/img/dark_mode/hr-line.png';
import Button from '../../components/Button';


const Signin1 = () => {

    const leagues = [
        1,
        2,
        3,
        4,
        5,
        6
    ]
    
    const options = [
        'Sort by',
        'Ascend',
        'Descend',
        'Recent'
    ]

    return (
        <div className=''>
            <div className='w-[441px] h-[441px] mx-auto mt-32'>
                <div className='w-[164px] h-[185px] mx-auto'>
                    <img src={logo} alt="logo" className='mx-auto' />
                    <img src={hrLine} alt="" className='my-7'/>
                    <p className='text-[#A7A7A7] text-sm text-center'>LEEG.IO</p>

                </div>
                <div className='bg-slate w-full h-48 mt-16 rounded-main p-[26px] flex flex-col'>
                    <div>
                        <p className='text-white text-2xl font-bold'>Sign in</p>
                        <p className='text-font-light-gray mt-3'>Sign in to access your account.</p>
                    </div>
                    <div className='flex justify-between mt-auto'>
                        <Button className='w-[180px] h-[53px] dark:bg-[#313435] font-bold'>Admin</Button>
                        <Button className='w-[180px] h-[53px] dark:bg-[#313435] font-bold'>Player</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin1
