import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "../../components/Card";
import search from "../../assets/img/dark_mode/search.png";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle/PageTitle";
import * as actions from "../../actions";
import apis from "../../utils/apis";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import verticalLine from "../../assets/img/dark_mode/vertical-line.png";
import profileImage from '../../assets/img/dark_mode/profile.png';

const Profile = () => {
  const leagues = useSelector((state) => state.home.leagues);

  const options = ["Ascend", "Descend", "Recent"];
  const [value, setValue] = useState("Sort by");

  const [step, setStep] = useState(2);

  useEffect(() => {
    // getLeagues();
  }, []);

  const goToStep1 = () => {
    setStep(1);
  };

  const goToStep2 = () => {
    setStep(2);
  };

  const goToStep3 = () => {
    setStep(3);
  };

  return (
    <div className="flex flex-col flex-grow">
      <PageTitle
        backIcon={leftarrowIcon}
        createAction={actions.OPEN_CREATE_LEAGUE_DIALOG}
      >
        Settings
      </PageTitle>
      <p className="text-sm text-font-dark-gray my-[20px]">
        Settings
        <span className="text-sky-500"> &gt; Personal Information</span>
      </p>
      <div className="flex flex-grow rounded-main bg-slate overflow-auto p-default">
        <div className="flex flex-col space-y-3">
          <button
            onClick={goToStep1}
            className={`${
              step == 1
                ? "bg-primary text-white font-bold"
                : "text-font-dark-gray font-medium"
            } rounded-default h-button text-sm w-[180px]`}
          >
            Personal Information
          </button>
          <button
            onClick={goToStep2}
            className={`${
              step == 2
                ? "bg-primary text-white font-bold"
                : "text-font-dark-gray font-medium"
            } rounded-default h-button text-sm w-[180px]`}
          >
            Personal Information
          </button>
          <button
            onClick={goToStep3}
            className={`${
              step == 3
                ? "bg-primary text-white font-bold"
                : "text-font-dark-gray font-medium"
            } rounded-default h-button text-sm w-[180px]`}
          >
            Personal Information
          </button>
        </div>
        <img src={verticalLine} alt="" className="mx-5"/>

        <div className="">
            <div className="flex">
              <img src={profileImage} alt="" />
            </div>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Profile;
