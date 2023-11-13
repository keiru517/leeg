import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../../../actions";
import Nav from "../../nav";
import { setAuthToken } from "../../../utils/authService";

const AuthLayout = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  const token = localStorage.getItem('token');
  useEffect(()=>{

    if (token) {
      setLoggedIn(true)
      setAuthToken(token);
      // navigate('/', {replace:true})
    } else {
      console.log(location.pathname)
      if (location.pathname !== "/resetpass" ) {
        navigate('/signin', { replace: true})
      } 
      setLoggedIn(false)
    }
    setLoading(false)
    
  }, [token])

  return (
    <div className="p-[20px_26px_26px_26px] dark:bg-black bg-light-charcoal justify-center flex flex-col flex-grow">
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
