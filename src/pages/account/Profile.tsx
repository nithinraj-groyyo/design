import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { fetchUserProfileResponse } from "../../api/userApi";
import { IUserProfile } from "../../types/users";

const Profile = () => {
  const userId = JSON.parse(localStorage.getItem("userId") as string);

  const [editProfileModal,setEditProfileModal] = useState(false);

  const [profileData, setProfileData] = useState<IUserProfile | undefined>();

  const editClickHandler = () =>{
    setEditProfileModal(true);
  } 

  useEffect(() => {
    const getUserProfile = async() => {
      try {
        const response = await fetchUserProfileResponse({userId: userId?.toString()});
        if(response){
          setProfileData(response?.userData)
        }
      } catch (error: any) {
        console.log(error?.message ?? "Unable to fetch User Data")
      }
    }
    getUserProfile();
  },[])

  return (
    <>
    {(editProfileModal && profileData) && <EditProfile profileData={profileData} setProfileData={setProfileData} onClose={() => {
      setEditProfileModal(false);
    }} />}
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
              <div className="w-1/2 flex gap-3">
                <span>{profileData?.firstName}</span>
                <span>{profileData?.lastName}</span>
              </div>
            </div>
            <Divider sx={{ width: "96%", mx: "auto" }} />
            <div className="flex ml-8">
              <div className="w-1/2">Contact Number</div>
              <div className="w-1/2">{profileData?.mobileNo}</div>
            </div>
            <Divider sx={{ width: "96%", mx: "auto" }} />
            <div className="flex ml-8">
              <div className="w-1/2">Email Id</div>
              <div className="w-1/2">{profileData?.emailId}</div>
            </div>
            <Divider sx={{ width: "96%", mx: "auto" }} />
            <div className="flex ml-8">
              <div className="w-1/2">Gender</div>
              <div className="w-1/2">{profileData?.gender ?? ""}</div>
            </div>
          </div>
        </div>
      </>}
    </>
  );
};

export default Profile;
