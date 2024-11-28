import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import PasswordField from "../../../components/PasswordField";
import { useChangePasswordMutation } from "../../../rtk-query/profileApiSlice";

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required("Re-entering the new password is required"),
});

const ChangePassword: React.FC = () => {
  const [changePassword] = useChangePasswordMutation();

  const formik = useFormik<ChangePasswordValues>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await changePassword({
          currentPassword: values?.currentPassword,
          newPassword: values?.newPassword
        }).unwrap();

        if (response?.status && response?.httpStatusCode === 200) {
          toast.success('Password changed successfully');
          resetForm();
        } else {
          throw new Error('Failed to change password');
        }
      } catch (error) {
        console.error('Error changing password:', error);
        toast.error('Failed to change password');
      }
    },
  });

  return (
    <div>
      {/* Desktop version */}
      <div className="xxs:hidden lg:block">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col bg-white p-4 m-6 rounded-xl gap-8">
            <div className="font-semibold">Change Password</div>
            <div className="flex justify-evenly w-full flex-col gap-4">
              <div className="w-1/2 pr-2">
                <PasswordField
                  id="currentPassword"
                  name="currentPassword"
                  label="Current Password"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                  helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                />
              </div>
              <div className="w-full flex flex-row gap-4">
                <PasswordField
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                />
                <PasswordField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Re-Enter New Password"
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
                variant="contained"
                className="w-[10rem] h-[3rem]"
                type="submit"
              >
                <b>Reset</b>
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Mobile version */}
      <div className="lg:hidden">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col bg-white p-4 m-4 rounded-xl gap-6">
            <div className="font-semibold text-lg">Change Password</div>
            <div className="flex flex-col gap-4">
              <PasswordField
                id="currentPassword"
                name="currentPassword"
                label="Current Password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                className="!w-full"
              />
              <PasswordField
                id="newPassword"
                name="newPassword"
                label="New Password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
                className="!w-full"
              />
              <PasswordField
                id="confirmPassword"
                name="confirmPassword"
                label="Re-Enter New Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                className="!w-full"
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button
                variant="contained"
                className="w-[8rem] h-[2.5rem]" 
                type="submit"
              >
                <b>Reset</b>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
