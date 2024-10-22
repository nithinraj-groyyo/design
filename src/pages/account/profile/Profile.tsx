import { Button, Divider, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { IUserProfile } from "../../../types/users";
import { useLazyGetUserProfileQuery } from "../../../rtk-query/userApiSlice";
import { toast } from "react-toastify";
import AccountSettingsLayout from "../../../layouts/AccountSettingsLayout";

const Profile = () => {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [getUserProfile, { isLoading }] = useLazyGetUserProfileQuery({});
  const [profileData, setProfileData] = useState<IUserProfile | undefined>();

  const editClickHandler = () => {
    setEditProfileModal(true);
  };

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await getUserProfile({}).unwrap();
        if (response?.status) {
          setProfileData(response?.data);
        }
      } catch (error: any) {
        let errorMessage = "An unknown error occurred while fetching user profile.";

        if (error?.data?.message) {
          errorMessage = error.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        console.error("Failed to fetch user profile: ", error);
        toast.error(`Failed to fetch user data: ${errorMessage}`);
      }
    }
    getUserData();
  }, []);

  return (
    <>
      {editProfileModal && profileData && (
        <EditProfile
          profileData={profileData}
          setProfileData={setProfileData}
          onClose={() => {
            setEditProfileModal(false);
          }}
        />
      )}
      {!editProfileModal && (
        <>
          <AccountSettingsLayout>
                <AccountSettingsLayout.Header title='Profile Details'>
                    <Button variant="contained" color="primary" className="!w-[10rem] h-[3rem]" onClick={() => editClickHandler()}>
                      Edit
                    </Button>
                </AccountSettingsLayout.Header>
                <AccountSettingsLayout.Body>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex ml-8">
                    <div className="w-1/2">Customer Name</div>
                    <div className="w-1/2 flex gap-3">
                      {isLoading ? (
                        <Skeleton variant="text" width={150} height={20} />
                      ) : (
                        <span>{profileData?.contactName || "N/A"}</span>
                      )}
                    </div>
                  </div>
                  <Divider sx={{ width: "96%", mx: "auto" }} />
                  <div className="flex ml-8">
                    <div className="w-1/2">Contact Number</div>
                    <div className="w-1/2">
                      {isLoading ? (
                        <Skeleton variant="text" width={120} height={20} />
                      ) : (
                        profileData?.contactNumber || "N/A"
                      )}
                    </div>
                  </div>
                  <Divider sx={{ width: "96%", mx: "auto" }} />
                  <div className="flex ml-8">
                    <div className="w-1/2">Email Id</div>
                    <div className="w-1/2">
                      {isLoading ? (
                        <Skeleton variant="text" width={200} height={20} />
                      ) : (
                        profileData?.email || "N/A"
                      )}
                    </div>
                  </div>
                  <Divider sx={{ width: "96%", mx: "auto" }} />
                  <div className="flex ml-8">
                    <div className="w-1/2">Gender</div>
                    <div className="w-1/2">
                      {isLoading ? (
                        <Skeleton variant="text" width={100} height={20} />
                      ) : (
                        profileData?.gender || "N/A"
                      )}
                    </div>
                  </div>
                </div>
              </AccountSettingsLayout.Body>
          </AccountSettingsLayout>          
        </>
      )}
    </>
  );
};

export default Profile;