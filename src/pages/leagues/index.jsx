import React, {useState, useEffect} from 'react';
import Card from '../../components/Card';
import search from '../../assets/img/search.png';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Modal from '../../components/Modal';
import PageTitle from '../../components/PageTitle/pageTitle';

const MyLeagues = () => {

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
        <div>
            <PageTitle button="Create League">My Leagues</PageTitle>
            <div className='rounded-main bg-slate overflow-auto mt-[20px] p-[26px]'>
                <div className='search flex justify-between space-x-3'>
                    <Input icon={search} className="flex-grow rounded-lg" placeholder="Search Leagues"/>
                    <Select className='w-[144px] rounded-lg' options={options}/>
                </div>
                <br></br>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                    leagues?.map(lg => <Card/>)
                } </div>
                <Modal />
            </div>
        </div>
    );
};

export default MyLeagues
