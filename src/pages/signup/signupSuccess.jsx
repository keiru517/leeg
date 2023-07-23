import React, {useState, useEffect} from 'react';
import logo from '../../assets/img/logo.png';
import hrLine from '../../assets/img/hr-line.png';
import Button from '../../components/Button';
import otpLine from '../../assets/img/otp-line.png';

const SignupSuccess = () => {

    return (
        <div className=''>
            <div className='w-[430px] h-[441px] mx-auto mt-32'>
                <div className='w-[164px] h-[185px] mx-auto'>
                    <img src={logo} alt="logo" className='mx-auto' />
                    <img src={hrLine} alt="" className='my-7'/>
                    <p className='font-gray text-sm text-center'>LEEG.IO</p>

                </div>
                <div className='bg-slate w-full h-[305px] mt-16 rounded-main p-[26px] flex flex-col'>
                    <div>
                        <p className='text-white text-2xl font-bold'>Verify Email Address</p>
                        <p className='text-[#BBBBBB] text-base mt-3'>Enter the SMS sent to <span className='text-white'>Gio.chichua9@gmail.com</span></p>
                    </div>
                    <div className='flex mb-5 mt-2 space-x-[26px]'> 
                            <div>
                                <input className='bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4' type="text" />
                                <img src={otpLine} alt="" />
                            </div>
                            <div>
                                <input className='bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4' type="text" />
                                <img src={otpLine} alt="" />
                            </div>
                            <div>
                                <input className='bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4' type="text" />
                                <img src={otpLine} alt="" />
                            </div>
                            <div>
                                <input className='bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4' type="text" />
                                <img src={otpLine} alt="" />
                            </div>
                    </div>
                    <div className='flex justify-between mb-4'>
                        <Button className='w-[377px] h-[53px] bg-primary'>Verify</Button>
                    </div>
                    <p className='font-gray text-center'>Don't receive the Email?<span className='text-primary font-semibold'> Resend Email</span></p>
                </div>
            </div>
        </div>
    );
};

export default SignupSuccess
