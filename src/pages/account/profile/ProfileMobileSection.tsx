import React, { useEffect, useState } from 'react'
import EditProfile from './EditProfile';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';
import { Button, Divider, Skeleton } from '@mui/material';
import { useLazyGetUserProfileQuery } from '../../../rtk-query/profileApiSlice';
import { IUserProfile } from '../../../types/users';
import { toast } from 'react-toastify';

const ProfileMobileSection = () => {
    const [editProfileModal, setEditProfileModal] = useState(false);
  const [getUserProfile, { isLoading }] = useLazyGetUserProfileQuery({});
  const [profileData, setProfileData] = useState<IUserProfile | undefined>();

  const token = JSON.parse(localStorage.getItem('authToken') as string);

  const editClickHandler = () => {
    setEditProfileModal(true);
  };

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await getUserProfile({authToken: token}).unwrap();
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
        <div className="">
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
                <AccountSettingsLayout>
                    <AccountSettingsLayout.Header title="Profile Details">
                        <Button
                            variant="contained"
                            color="primary"
                            className="!w-full sm:!w-[10rem] h-[3rem]"
                            onClick={() => editClickHandler()}
                        >
                            Edit
                        </Button>
                    </AccountSettingsLayout.Header>
                    <AccountSettingsLayout.Body>
                        <div className="flex flex-col gap-4 mt-8 px-4 sm:px-8">
                            <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-1/2 mb-2 sm:mb-0">Customer Name</div>
                                <div className="w-full sm:w-1/2 flex gap-3">
                                    {isLoading ? (
                                        <Skeleton variant="text" width={150} height={20} />
                                    ) : (
                                        <span>{profileData?.contactName || "N/A"}</span>
                                    )}
                                </div>
                            </div>
                            <Divider sx={{ width: "100%" }} className="mx-auto" />
                            <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-1/2 mb-2 sm:mb-0">Contact Number</div>
                                <div className="w-full sm:w-1/2">
                                    {isLoading ? (
                                        <Skeleton variant="text" width={120} height={20} />
                                    ) : (
                                        profileData?.contactNumber || "N/A"
                                    )}
                                </div>
                            </div>
                            <Divider sx={{ width: "100%" }} className="mx-auto" />
                            <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-1/2 mb-2 sm:mb-0">Email Id</div>
                                <div className="w-full sm:w-1/2">
                                    {isLoading ? (
                                        <Skeleton variant="text" width={200} height={20} />
                                    ) : (
                                        profileData?.email || "N/A"
                                    )}
                                </div>
                            </div>
                            <Divider sx={{ width: "100%" }} className="mx-auto" />
                            <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-1/2 mb-2 sm:mb-0">Gender</div>
                                <div className="w-full sm:w-1/2">
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
            )}
        </div>

    )
}

export default ProfileMobileSection
