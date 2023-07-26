import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import search from '../../assets/img/dark_mode/search.png';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Modal from '../../components/Modal';
import PageTitle from '../../components/PageTitle/pageTitle';
import * as actions from '../../actions';

const MyLeagues = () => {

    const modal_status = useSelector(state=>state.leagues.league_dialog_open)
    const create_step = useSelector(state=>state.leagues.create_step)

    const leagues = [
        1,
        2,
        3,
        4,
        5,
        6
    ]
    
    const options = [
        'Ascend',
        'Descend',
        'Recent'
    ]

    return (
        <div>
            <PageTitle action={actions.OPEN_CREATE_LEAGUE} button="Create League">My Leagues</PageTitle>
            <div className='rounded-main bg-slate overflow-auto mt-[20px] p-[26px]'>
                <div className='search flex justify-between space-x-3'>
                    <Input icon={search} className="flex-grow rounded-lg" placeholder="Search Leagues"/>
                    <Select className='w-[144px] rounded-lg' options={options}> Sort by</Select>
                </div>
                <br></br>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                    leagues?.map((lg, idx) => <Card key={idx}/>)
                } </div>
                <Modal status={modal_status} create_step={create_step}/>
            </div>
        </div>
    );
};

export default MyLeagues
