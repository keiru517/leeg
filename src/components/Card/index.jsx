import mark from '../../assets/img/mark.png';
import rightarrow from '../../assets/img/right-arrow.png';

const Card = (props) => {
    return (
        <div className="league">
            <div className='flex justify-between'>
                <div className='flex items-center'>
                    <img src={mark}></img>
                    <p className='text-white text-sm ml-5'>2023 TABC Summer League</p>
                </div>
                <div className='flex items-center'>
                    <img src={rightarrow}></img>
                </div>
            </div>
            <div className="league-description">
                <p className='date-info text-left'>Start Date: Friday, July 7 2023  End Date: Monday, Aug 12 2023</p>
                <p className='league-content text-left'>introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.</p>
            </div>
        </div>
    );
}

export default Card;