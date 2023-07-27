import mark from '../../assets/img/dark_mode/mark.png';
import rightarrow from '../../assets/img/dark_mode/right-arrow.png';

const Card = (props) => {
    return (
        <div className="rounded-default h-[185px] bg-charcoal p-default transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-dark-gray duration-200 cursor-pointer">
            <div className='flex justify-between'>
                <div className='flex items-center'>
                    <img src={mark}></img>
                    <p className='text-white text-sm ml-5'>2023 TABC Summer League</p>
                </div>
                {/* <div className='flex items-center'>
                    <img src={rightarrow}></img>
                </div> */}
            </div>
            <div className="h-[75px] mt-4">
                <p className='dark:text-font-dark-gray text-[10px] text-left'>Start Date: Friday, July 7 2023  End Date: Monday, Aug 12 2023</p>
                <p className='dark: text-[#c6c6c6] text-left text-xs h-[54px] mt-2'>introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.</p>
            </div>
        </div>
    );
}

export default Card;