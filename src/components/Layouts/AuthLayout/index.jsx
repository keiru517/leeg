import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../actions";
import Nav from "../../nav";

const AuthLayout = (props) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    getUserInfo().then((status) => {
      if (status) {
        setLoggedIn(true);
        navigate('/', {replace:true})
      }
      else setLoggedIn(false);
      setLoading(false);
    });

  }, []);

  return (
    <div className="p-[20px_26px_51px_26px] dark:bg-black bg-[#f4f4f4] justify-center flex flex-col flex-grow">
      {isLoading ? (
        <div className="text-white text-3xl">Page is loading.</div>
      ) : isLoggedIn ? (
        <>
          <Nav />
          {props.children}
        </>
      ) : (
        <>
          {props.children}
        </>
      )}
    </div>
  );
};

export default AuthLayout;
