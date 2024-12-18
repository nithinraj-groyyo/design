import { Button, Divider, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { IUserProfile } from "../../../types/users";
import { useLazyGetUserProfileQuery } from "../../../rtk-query/profileApiSlice";
import { toast } from "react-toastify";
import AccountSettingsLayout from "../../../layouts/AccountSettingsLayout";
import ProfileMobileSection from "./ProfileMobileSection";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Profile = () => {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [getUserProfile, { isLoading }] = useLazyGetUserProfileQuery({});
  const [profileData, setProfileData] = useState<IUserProfile | undefined>();

  const editClickHandler = () => {
    setEditProfileModal(true);
  };

  const { authToken } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await getUserProfile({authToken}).unwrap();
        if (response?.status) {
          setProfileData(response?.result);
          console.log(profileData,"profileDataprofileData")
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
    <div>
      <div className="xxs:hidden lg:block">
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
                        <span>{profileData?.name || "N/A"}</span>
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
                        profileData?.mobileNo || "N/A"
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
                  {/* <div className="flex ml-8">
                    <div className="w-1/2">Gender</div>
                    <div className="w-1/2">
                      {isLoading ? (
                        <Skeleton variant="text" width={100} height={20} />
                      ) : (
                        profileData?.gender || "N/A"
                      )}
                    </div>
                  </div> */}
                </div>
              </AccountSettingsLayout.Body>
            </AccountSettingsLayout>
          </>
        )}
      </div>
      <div className="lg:hidden "> 
        <ProfileMobileSection/>
      </div>
    </div>
  );
};

export default Profile;