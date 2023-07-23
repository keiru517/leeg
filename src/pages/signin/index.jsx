import React, {useState, useEffect} from 'react';
import Input from '../../components/Input';
import logo from '../../assets/img/logo.png';
import hrLine from '../../assets/img/hr-line.png';
import Button from '../../components/Button';
import gmail from '../../assets/img/gmail.png';
import lock from '../../assets/img/lock.png';
import eyeDisable from '../../assets/img/eye-disable.png';

const Signin = () => {

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
                    <p className='text-[#BBBBBB] text-sm text-center'>LEEG.IO</p>

                </div>
                <div className='bg-slate w-full h-[358px] mt-16 rounded-main p-[26px] flex flex-col'>
                    <div>
                        <p className='text-white text-2xl font-bold'>Sign in</p>
                        <p className='text-[#BBBBBB] mt-3'>Sign in to access your account</p>
                    </div>
                    <div className='my-6 space-y-4'>
                        <Input className='bg-[#272B30]' icon={gmail} placeholder="Email Address"></Input>
                        <Input className='bg-[#272B30]' icon={lock} type='password' placeholder="Password"  option={eyeDisable}></Input>
                    </div>
                    <div className='flex justify-between mb-4'>
                        <Button className='w-[377px] h-[53px] bg-primary'>Login</Button>
                    </div>
                    <p className='font-gray text-center'>Don't have an account?<span className='text-sky-500'> Sing Up</span></p>
                </div>
            </div>
        </div>
    );
};

export default Signin
