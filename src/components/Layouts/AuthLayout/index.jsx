import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { getUserInfo } from "../../../actions";
import * as actions from "../../../actions";
import Nav from "../../nav";
import { setAuthToken, logoutUser } from "../../../utils/authService";
import { isExpired, decodeToken } from "react-jwt";

const AuthLayout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      setAuthToken(token);
    } else {
      if (location.pathname !== "/resetpass") {
        navigate("/signin", { replace: true });
      }
      setLoggedIn(false);
    }
    setLoading(false);
  }, [token]);

  return (
    <div className="dark:bg-black bg-light-charcoal justify-center flex flex-col flex-grow">
      {isLoading ? (
        <div className="text-white text-3xl">Page is loading.</div>
      ) : isLoggedIn ? (
        <>
          <Nav />
          <div className="p-[0px_10px_10px_10px] sm:p-[0px_26px_26px_26px] flex flex-col flex-grow">
            {props.children}
          </div>
        </>
      ) : (
        <>
          <div className="p-[10px_10px_10px_10px] sm:p-[0px_26px_26px_26px] flex flex-col">
            {props.children}
          </div>
        </>
      )}
    </div>
  );
};

export default AuthLayout;
