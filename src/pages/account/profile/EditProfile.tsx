import React from 'react';
import { Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { IUserDetailsRequest, IUserProfile } from '../../../types/users';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';
import { useUpdateUserProfileMutation } from '../../../rtk-query/profileApiSlice';

const validationSchema = Yup.object({
  name: Yup.string().required('First Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  mobileNo: Yup.string().required('Contact Number is required'),
  profilePhoto: Yup.mixed().optional().nullable(),
});

interface IEditProfileProps {
  profileData: IUserProfile;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
}

const EditProfile = ({ profileData, setProfileData, onClose }: IEditProfileProps) => {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const formik = useFormik({
    initialValues: {
      contactName: profileData?.name || "",
      email: profileData?.email || "",
      gender: profileData?.gender || "",
      contactNumber: profileData?.mobileNo || "",
      // profilePhoto: null as File | null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload: IUserDetailsRequest = {
        id: profileData?.id,
        name: values?.contactName || null,
        mobileNo: values?.contactNumber || null,
        gender: values.gender || null,
        email: values.email || "",
        // fileName: values.profilePhoto ? values.profilePhoto?.name : null,
      };

      try {
        const response = await updateUserProfile(payload).unwrap();
        if (response?.status && response?.httpStatusCode === 200) {
          toast.success(response?.message);
          setProfileData(payload);
          onClose();
        }
      } catch (error: any) {
        toast.error(error?.message ?? 'Error updating profile');
        console.error('Error updating profile: ', error);
      }
    },
  });

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <AccountSettingsLayout>
        <AccountSettingsLayout.Header title="Edit Details">
          <div className="flex gap-4 flex-wrap">
            <Button
              variant="contained"
              className="w-full sm:w-auto h-[2.5rem] sm:h-[3rem] !bg-white"
              onClick={handleCancel}
            >
              <p className="text-sm sm:text-base font-semibold text-black">Cancel</p>
            </Button>
            <Button
              variant="contained"
              type="submit"
              className="w-full sm:w-auto h-[2.5rem] sm:h-[3rem]"
            >
              <p className="text-sm sm:text-base font-semibold">{isLoading ? <CircularProgress size={20} /> : "Save"}</p>
            </Button>
          </div>
        </AccountSettingsLayout.Header>
        <AccountSettingsLayout.Body>
          <div className="flex flex-col gap-8 px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2 flex flex-col gap-4">
                <TextField
                  id="contactName"
                  name="contactName"
                  variant="outlined"
                  label="First Name"
                  className="!w-full"
                  value={formik.values.contactName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactName && Boolean(formik.errors.contactName)}
                  helperText={formik.touched.contactName ? formik.errors.contactName as string : undefined}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  className="!w-full"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email ? formik.errors.email as string : undefined}
                />


              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-4">
                <TextField
                  id="contactNumber"
                  name="contactNumber"
                  label="Contact Number"
                  variant="outlined"
                  className="!w-full"
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                  helperText={formik.touched.contactNumber ? formik.errors.contactNumber as string : undefined}
                />
                <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    label="Gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // displayEmpty
                    className="!w-full"
                  >
                    <MenuItem value="" disabled>
                      Select a gender
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  <FormHelperText>
                    {formik.touched.gender ? formik.errors.gender as string : undefined}
                  </FormHelperText>
                </FormControl>
                {/* <div className="flex flex-col w-full gap-2">
                  <div className="font-semibold">Profile Photo</div>
                  <input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept="image/*"
                    className="!w-full"
                    onChange={(event) => {
                      formik.setFieldValue('profilePhoto', event.currentTarget.files?.[0] || null);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.profilePhoto && formik.errors.profilePhoto && (
                    <div className="text-red-600">{formik.errors.profilePhoto as string}</div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </AccountSettingsLayout.Body>
      </AccountSettingsLayout>
    </form>
  );
};

export default EditProfile;
