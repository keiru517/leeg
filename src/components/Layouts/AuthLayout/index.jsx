import { useEffect, useState } from "react";
import { getUserInfo } from "../../../actions";
import Signin from "../../../pages/signin";
import Nav from "../../nav";

const AuthLayout = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    getUserInfo().then((status) => {
      if (status) setLoggedIn(true);
      else setLoggedIn(false);
      setLoading(false);
    });
  }, []);
  return (
    <div className="main justify-center">
      {isLoading ? (
        <div>Page is loading.</div>
      ) : isLoggedIn ? (
        <>
          <Nav />
          {props.children}
        </>
      ) : (
        "Go to signin"
      )}
    </div>
  );
};

export default AuthLayout;
