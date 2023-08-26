import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import { useDispatch } from "react-redux";

const Card = (props) => {
  const { route, item } = props;
  const dispatch = useDispatch();
//   const [logo, setLogo] = useState(null);

  useEffect(() => {
    axios
      .get(`/league/logo/${item.id}`, { responseType: "arraybuffer" })
      .then((res) => {
        const logoUrl = URL.createObjectURL(
          new Blob([res.data], { type: "image/jpeg" })
        );
        
        dispatch({
          type: actions.SET_LOGO_URL,
          payload: { id: item.id, logoUrl: logoUrl },
        });
      });
  }, [item.id]);

  return (
    <Link to={`/${route}/${item.id}`}>
      <div className="rounded-default h-[185px] bg-charcoal p-default transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-dark-gray duration-200 cursor-pointer">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img src={item.logo} className="w-10 h-10 rounded-lg"></img>
            <p className="text-white text-sm ml-5">{item.name}</p>
          </div>
          {/* <div className='flex items-center'>
                    <img src={rightarrow}></img>
                </div> */}
        </div>
        <div className="h-[75px] mt-4">
          <p className="dark:text-font-dark-gray text-[10px] text-left">
            Start Date: {item.startDate} End Date: {item.endDate}
          </p>
          <p className="dark: text-[#c6c6c6] text-left text-xs h-[54px] mt-2">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
