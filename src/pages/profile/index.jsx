import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Input from "../../components/Input";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import * as actions from "../../actions";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import verticalLine from "../../assets/img/dark_mode/vertical-line.png";
import horizontalLine  from "../../assets/img/dark_mode/horizontal-line.png";
import profileImage from "../../assets/img/dark_mode/profile.png";
import AdminTable from '../../components/Table/Admin';
import eyeDisable from "../../assets/img/dark_mode/eye-disable.png";
import toggleOn from '../../assets/img/dark_mode/toggle-on.png';

const Profile = () => {
  const admins = useSelector(state=>state.home.admins);

  const breadcrumList = [
    "Personal Information",
    "Admin Access",
    "Stats Tracking",
  ];
  const [value, setValue] = useState("");

  const [status, setStatus] = useState("information");
  const goToPassword = () => {
    setStatus("password");
  };

  const goToInformation = () => {
    setStatus("information");
  };

  const [step, setStep] = useState(1);
  const [breadcrum, setBreadcrum] = useState(breadcrumList[0]);

  const goToStep1 = () => {
    setStep(1);
    setBreadcrum(breadcrumList[0]);
  };

  const goToStep2 = () => {
    setStep(2);
    setBreadcrum(breadcrumList[1]);
  };

  const goToStep3 = () => {
    setStep(3);
    setBreadcrum(breadcrumList[2]);
  };

  const updateInformation = () => {
    console.log("clicked update information");
  };

  const updatePassword = () => {
    console.log("clicked update Password");
  };

  const inviteAdmin = () => {

    console.log("invite Admin clicked! The admin email is:", value);
    setValue("")
  }

  useEffect(() => {
    // getLeagues();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <PageTitle
        backIcon={leftarrowIcon}
        createAction={actions.OPEN_CREATE_LEAGUE_DIALOG}
      >
        Settings
      </PageTitle>
      <p className="text-sm text-font-dark-gray my-[20px]">
        <span className="">Settings</span>
        <span className="text-sky-500"> &gt; {breadcrum}</span>
      </p>
      <div className="flex flex-grow rounded-main bg-slate overflow-auto p-default">
        <div className="flex flex-col space-y-3">
          <button
            onClick={goToStep1}
            className={`${
              step === 1
                ? "bg-primary text-white font-bold"
                : "text-font-dark-gray font-medium"
            } rounded-default h-button text-sm w-[180px]`}
          >
            Personal Information
          </button>
          <button
            onClick={goToStep2}
            className={`${
              step === 2
                ? "bg-primary text-white font-bold"
                : "text-font-dark-gray font-medium"
            } rounded-default h-button text-sm w-[180px]`}
          >
            Admin Access
          </button>
          <button
            onClick={goToStep3}
            className={`${
              step === 3
                ? "bg-primary text-white font-bold"
                : "text-font-dark-gray font-medium"
            } rounded-default h-button text-sm w-[180px]`}
          >
            Stats Tracking
          </button>
        </div>
        <img src={verticalLine} alt="" className="mx-5" />

        {step === 1 ? (
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col flex-grow space-y-5">
              <div className="flex items-center">
                <img src={profileImage} alt="" className="mr-8" />
                <div className="bg-primary h-button rounded-default text-white font-bold text-sm mr-3 w-[180px] hover:opacity-70 cursor-pointer flex justify-center items-center">
                  {/* <input style={{display:'none'}} type='file' className=" rounded-default w-[180px] h-input text-white font-bold text-sm mr-3 hover:opacity-70 ">
                    
                  </input> */}
                  <input className="hidden" type='file'/>
                  Upload New Picture
                </div>
               <button className="bg-[#313435] rounded-default w-[103px] h-button text-white font-bold text-sm hover:opacity-70">
                  Remove
                </button>
              </div>
              {status === "information" ? (
                <>
                  <Input
                    className="text-font-dark-gray text-xs rounded-default"
                    placeholder="Type Email Address*"
                  ></Input>
                  <div className="grid grid-cols-2 space-x-3">
                    <Input
                      className="text-font-dark-gray text-xs rounded-default"
                      placeholder="Type Your First Name"
                    ></Input>
                    <Input
                      className="text-font-dark-gray text-xs rounded-default"
                      placeholder="Type Your Last Name"
                    ></Input>
                  </div>
                  <Input
                    className="text-font-dark-gray text-xs rounded-default"
                    placeholder="Select Location*"
                  ></Input>
                </>
              ) : (
                <>
                  <Input
                    type="password"
                    className="text-xs rounded-default"
                    placeholder="Type Your Old Password"
                  ></Input>
                  <div className="grid grid-cols-2 space-x-3">
                    <Input
                      type="password"
                      className="text-xs rounded-default"
                      placeholder="Type Your New Passowrd"
                      option={eyeDisable}
                    ></Input>
                    <Input
                      type="password"
                      className="text-xs rounded-default"
                      placeholder="Retype Your New Passowrd"
                      option={eyeDisable}
                    ></Input>
                  </div>
                </>
              )}
              <div className="space-y-5">
                <p
                  onClick={
                    status === "information" ? goToPassword : goToInformation
                  }
                  className="text-white font-medium text-sm cursor-pointer hover:opacity-70"
                >
                  {status === "information"
                    ? "Update Password"
                    : "Update Information"}
                </p>
                <button
                  onClick={
                    status === "information"
                      ? updateInformation
                      : updatePassword
                  }
                  className="bg-primary h-12 text-white font-bold text-sm w-[76px] rounded-default hover:opacity-70"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : (
          step === 2?
          <div className="flex flex-col flex-grow">
            <AdminTable ></AdminTable>
            <img src={horizontalLine} alt="" className="my-5"/>
            <div className="flex space-x-3">
              <Input value={value} onChange={(e)=> setValue(e.target.value)} className='flex flex-grow rounded-default text-xs' placeholder="Type Admin Email Address"></Input>
              <button onClick={inviteAdmin} className="text-white bg-primary font-bold text-sm w-[78px] h-12 rounded-default">Invite</button>
            </div>
          </div>
          :
          <div className="flex flex-col flex-grow">
            {
              admins.map((admin, idx)=>(
                <>
                  <div className="flex justify-between">  
                    <p className="text-white font-semibold text-sm">Stats tracking {idx + 1}</p>
                    <img src={toggleOn} alt="" className="w-[50px]"/>

                  </div>

                  <hr className="h-px my-4 bg-charcoal border-0" />
                
                </>
              ))
            }
          </div>
        )}
      </div>
      <Modal />
    </div>
  );
};

export default Profile;
