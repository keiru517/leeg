import React, {useState, useEffect} from 'react';
import League from '../../components/league';
import search from '../../assets/img/search.png';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Modal from '../../components/Modal';
import PageTitle from '../../components/PageTitle/pageTitle';
import logo from '../../assets/img/logo.png';
import hrLine from '../../assets/img/hr-line.png';
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
                    <p className='text-[#BBBBBB] text-sm text-center'>LEEG.IO</p>

                </div>
                <div className='bg-nav w-full h-48 mt-16 rounded-main p-[26px] flex flex-col'>
                    <div>
                        <p className='text-white text-2xl font-bold'>Sign in</p>
                        <p className='text-[#BBBBBB] mt-3'>Sign in to access your account</p>
                    </div>
                    <div className='flex justify-between mt-auto'>
                        <Button className='w-[180px] h-[53px] bg-primary'>Admin</Button>
                        <Button className='w-[180px] h-[53px] bg-primary'>Player</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin1
