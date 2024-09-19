import React from 'react';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { IUserDetailsRequest, IUserProfile } from '../../types/users';
import { updateUserProfileResponse } from '../../api/userApi';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  contactName: Yup.string().required('Contact Name is required'),
  profilePhoto: Yup.mixed().optional().nullable(),
});

interface IEditProfileProps {
  profileData: IUserProfile;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
}

const EditProfile = ({ profileData, setProfileData, onClose }: IEditProfileProps) => {
  const userId = JSON.parse(localStorage.getItem("userId") as string);

  const formik = useFormik({
    initialValues: {
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
      email: profileData?.emailId || "",
      gender: profileData?.gender || "",
      contactName: profileData?.mobileNo || "",
      profilePhoto: null as File | null
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload: IUserDetailsRequest = {
          userId,
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          emailId: values.email,
          mobileNo: values.contactName,
          fileName: values.profilePhoto ? values.profilePhoto?.name : null,
        };
 

        const response = await updateUserProfileResponse({data: payload})
        if(response?.message === "success"){
          toast.success('Profile updated successfully');
          setProfileData(payload); 
          onClose(); 
        }
      } catch (error: any) {
        toast.error(error?.message ?? 'Error updating profile');
        console.error('Error updating profile : ', error);
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
      <div className="p-4 bg-white m-4 rounded-lg flex flex-col gap-8">
        <div className="font-bold text-lg">Edit Details</div>
        <div className="flex gap-8">
          <div className="flex flex-col w-1/2 gap-4">
            <TextField
              id="firstName"
              name="firstName"
              variant="outlined"
              label="First Name"
              className="!w-full"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName ? formik.errors.firstName as string : undefined}
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
                displayEmpty
                className="!w-full"
                renderValue={(selected) => {
                  if (!selected) {
                    return <em></em>;
                  }
                  return selected;
                }}
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
          </div>
          <div className="flex flex-col w-1/2 gap-4">
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              className="!w-full"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName ? formik.errors.lastName as string : undefined}
            />
            <TextField
              id="contactName"
              name="contactName"
              label="Contact Name"
              variant="outlined"
              className="!w-full"
              value={formik.values.contactName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contactName && Boolean(formik.errors.contactName)}
              helperText={formik.touched.contactName ? formik.errors.contactName as string : undefined}
            />
            <div className="flex flex-col w-full gap-2">
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
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-8 mt-4">
          <Button
            variant="contained"
            type="submit"
            className="w-[10rem] h-[3rem] !rounded-full !bg-[#a3865b]"
          >
            <p className="text-base font-semibold">Save</p>
          </Button>
          <Button
            variant="contained"
            className="w-[10rem] h-[3rem] !rounded-full !bg-[#D7B889]"
            onClick={handleCancel}
          >
            <p className="text-base font-semibold">Cancel</p>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;