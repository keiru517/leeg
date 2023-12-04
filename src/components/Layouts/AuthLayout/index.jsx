import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "../../nav";
import { setAuthToken, logoutUser } from "../../../utils/authService";
import { isExpired, decodeToken } from "react-jwt";

const AuthLayout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  const token = localStorage.getItem('token');
  
  // useEffect(() => {
  //   const handleUserActivity = () => {
  //     if (token && isExpired(token)) {
  //       setLoggedIn(false);
  //       logoutUser();
  //     }
  //   };

  //   // Add event listener for user activity (e.g., mousemove, keydown, etc.)
  //   document.addEventListener("mousemove", handleUserActivity);
  //   document.addEventListener("keydown", handleUserActivity);

  //   return () => {
  //     // Clean up the event listener when the component unmounts
  //     document.removeEventListener("mousemove", handleUserActivity);
  //     document.removeEventListener("keydown", handleUserActivity);
  //   };
  // }, [token]);

  useEffect(()=>{
    if (token) {
      // if (!isExpired(token)) {
        setLoggedIn(true)
        setAuthToken(token);
      // } else {
      //   setLoggedIn(false)
      //   logoutUser();
      // }
    } else {
      console.log(location.pathname)
      if (location.pathname !== "/resetpass" ) {
        navigate('/signin', { replace: true})
      }
      setLoggedIn(false)
    }
    setLoading(false)
    
  }, [token])



  // useEffect(()=>{

  //   if (token) {
  //     setLoggedIn(true)
  //     setAuthToken(token);
  //     // navigate('/', {replace:true})
  //   } else {
  //     console.log(location.pathname)
  //     if (location.pathname !== "/resetpass" ) {
  //       navigate('/signin', { replace: true})
  //     } 
  //     setLoggedIn(false)
  //   }
  //   setLoading(false)
    
  // }, [token])

  return (
    <div className="dark:bg-black bg-light-charcoal flex flex-col flex-grow">
      {isLoading ? (
        <div className="text-white text-3xl">Page is loading.</div>
      ) : isLoggedIn ? (
        <>
          <Nav />
          <div className="p-[20px_26px_51px_26px]">
            {props.children}
          </div>
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
