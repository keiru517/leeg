
import { Link } from "react-router-dom";

const Card = (props) => {
    const { route, item} = props;
    return (
        <Link to = {`/${route}/${item.id}`}>
        <div className="rounded-default h-[185px] bg-charcoal p-default transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-dark-gray duration-200 cursor-pointer">
            <div className='flex justify-between'>
                <div className='flex items-center'>
                    <img src={item.logo}></img>
                    <p className='text-white text-sm ml-5'>{item.name}</p>
                </div>
                {/* <div className='flex items-center'>
                    <img src={rightarrow}></img>
                </div> */}
            </div>
            <div className="h-[75px] mt-4">
                <p className='dark:text-font-dark-gray text-[10px] text-left'>Start Date: {item.startDate}  End Date: {item.endDate}</p>
                <p className='dark: text-[#c6c6c6] text-left text-xs h-[54px] mt-2'>{item.description}</p>
            </div>
        </div>
        </Link>
    );
}

export default Card;