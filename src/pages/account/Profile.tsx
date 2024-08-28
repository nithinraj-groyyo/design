import { Button, Divider } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";

const Profile = () => {
  const navigate = useNavigate();
  const [editProfileModal,setEditProfileModal] = useState(false);
  const editClickHandler = () =>{
    navigate('edit');
    setEditProfileModal(true);
  }

  return (
    <>
    {editProfileModal && <EditProfile/>}
      {!editProfileModal && <>
        <div className="flex flex-col bg-[#a3865b] w-full h-fit gap-8 p-8 py-16">
          <div className="font-semibold text-5xl text-white">Welcome Back,</div>
          <div className="text-white text-xl">Profile Details</div>
        </div>
        <div className="mt-4 flex flex-col w-full">
          <div className="items-end w-full flex justify-end ">
            <Button
              variant="contained"
              className="w-[12rem] h-[3rem] !rounded-full !bg-[#a3865b] !mr-8"
              onClick={editClickHandler}
            >
              <p className="text-base font-semibold">Edit</p>
            </Button>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex ml-8">
              <div className="w-1/2">Customer Name</div>
              <div className="w-1/2">Keshav Verma</div>
            </div>
            <Divider sx={{ width: "96%", mx: "auto" }} />
            <div className="flex ml-8">
              <div className="w-1/2">Contact Number</div>
              <div className="w-1/2">7973099999</div>
            </div>
            <Divider sx={{ width: "96%", mx: "auto" }} />
            <div className="flex ml-8">
              <div className="w-1/2">Email Id</div>
              <div className="w-1/2">keshav@gmail.com</div>
            </div>
            <Divider sx={{ width: "96%", mx: "auto" }} />
            <div className="flex ml-8">
              <div className="w-1/2">Gender</div>
              <div className="w-1/2">Male</div>
            </div>
          </div>
        </div>
      </>}
    </>
  );
};

export default Profile;
