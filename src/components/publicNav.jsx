import React, { useEffect } from "react";
import logo from "../assets/img/dark_mode/logo.png";
import { Link } from "react-router-dom";

const PublicNav = () => {

  return (
    <div className="dark:bg-slate bg-white py-1  flex items-center justify-between">
      <div className="title flex items-center space-x-8 px-3">
        <div className="logo flex">
          <div className="flex">
            <Link to={'/'} className="flex">
              <img src={logo}></img>
            <p className="dark:text-white text-[#33383F] text-base text-left italic font-semibold mx-3">
              Leeg.io
            </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicNav;