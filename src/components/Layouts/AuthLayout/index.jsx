import { useEffect, useState } from "react";

const AuthLayout = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    getUserInfo().then((isLoggedIn) => {
      if (isLoggedIn) setLoading(true);
      else setLoading(false);
    });
  }, []);
  return <div>{isLoading ? <div>Page is loading.</div> : props.children}</div>;
};

export default AuthLayout;
