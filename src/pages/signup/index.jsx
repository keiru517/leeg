import React, {useState, useEffect} from 'react';
import Input from '../../components/Input';
import logo from '../../assets/img/dark_mode/logo.png';
import hrLine from '../../assets/img/dark_mode/hr-line.png';
import Button from '../../components/Button';
import lock from '../../assets/img/dark_mode/lock.png';
import eyeDisable from '../../assets/img/dark_mode/eye-disable.png';
import upload from '../../assets/img/dark_mode/upload_photo.png';
import calendar from '../../assets/img/dark_mode/calendar.png';
import updown from '../../assets/img/dark_mode/updown.png';
import user from '../../assets/img/dark_mode/user.png';

const Signup = () => {

    return (
        <div className=''>
            <div className='w-[441px] h-[441px] mx-auto mt-32'>
                <div className='w-[164px] h-[185px] mx-auto'>
                    <img src={logo} alt="logo" className='mx-auto' />
                    <img src={hrLine} alt="" className='my-7'/>
                    <p className='text-[#ADADAD] text-sm text-center'>LEEG.IO</p>

                </div>
                <div className='bg-slate w-full h-[535px] mt-16 rounded-main p-[26px] flex flex-col'>
                    <div>
                        <p className='text-white text-2xl font-bold'>Personal Details</p>
                        <p className='text-[#BBBBBB] mt-3'>Sign up to access our admin account.</p>
                    </div>
                    <div className='mt-6'>
                        <div className='flex items-center'>
                            <img src={upload} alt="" />
                            <p className='text-white text-sm ml-[10px]'>Upload Picture</p>
                        </div>
                        <div className='my-6 space-y-4 '>
                            <div className='grid grid-cols-2 gap-4'>
                                <Input className='bg-[#272B30]' icon={user} placeholder="First Name"></Input>
                                <Input className='bg-[#272B30]' icon={user} placeholder="Last Name"></Input>
                            </div>
                            <Input className='bg-[#272B30]' icon={lock} type='password' placeholder="Password"  option={eyeDisable}></Input>
                            <Input className='bg-[#272B30]' icon={calendar} type='date' placeholder="Enter Date of Birth"  option={updown}></Input>
                        </div>
                        <div className='flex justify-between mb-4'>
                            <Button className='w-[377px] h-[48px] bg-primary'>Create Account</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup
