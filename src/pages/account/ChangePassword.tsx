import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required("Re-entering the new password is required"),
});

const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
      
        const response = await fetch('/api/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response) {
          toast.success('Password changed successfully');
        }
      } catch (error) {
        console.error('Error changing password:', error);
        toast.error('Failed to change password');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col bg-white p-4 m-6 rounded-xl gap-8">
        <div className="font-semibold">Change Password</div>
        <div className="flex justify-evenly w-full flex-col gap-4">
          <div className="w-full gap-8">
            <TextField
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              variant="outlined"
              className="w-1/2"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
              helperText={formik.touched.currentPassword && formik.errors.currentPassword}
            />
          </div>
          <div className="w-full flex flex-row gap-4">
            <TextField
              id="newPassword"
              name="newPassword"
              label="New Password"
              variant="outlined"
              className="w-full"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Re-Enter New Password"
              variant="outlined"
              className="w-full"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </div>
        </div>
        <div>
          <Button
            variant="outlined"
            className="w-[10rem] h-[3rem] !rounded-lg !bg-[#A2865B] !text-white"
            type="submit"
          >
            <b>Reset</b>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;