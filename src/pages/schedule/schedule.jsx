import React, {useState, useEffect, Children} from 'react';
import League from '../../components/league';
import search from '../../assets/img/search.png';
import leftarrowIcon from '../../assets/img/left-arrow.png';
import mark from '../../assets/img/mark.png';
import editIcon from '../../assets/img/edit.png';
import deleteIcon from '../../assets/img/delete.png';
// import delete from '../../assets/img/delete.png';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Modal from '../../components/Modal';
import PageTitle from '../../components/PageTitle/pageTitle';



const Schedule = () => {

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
            <PageTitle backIcon={leftarrowIcon} logo={mark} editIcon={editIcon} deleteIcon={deleteIcon} button="Create Match">2023 TABC Summer League</PageTitle>
            <p className='gray-font'>2023 TABC Summer League</p>
            <div className='body overflow-auto'>
                <div className='search flex justify-between space-x-2'>
                    <Input icon={search} className="flex-grow" placeholder="Search Leagues"/>
                    <Select className= 'w-[144px]' options={options}/>
                </div>
                <br></br>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                    leagues?.map(lg => <League/>)
                } </div>
                <Modal />
            </div>
        </div>
    );
};

export default Schedule
