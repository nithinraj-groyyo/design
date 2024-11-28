import React, { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useUpdatePasswordMutation } from '../../rtk-query/profileApiSlice';
import PasswordField from '../../components/PasswordField';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md m-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>

        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            if (token) {
              try {
                const response = await updatePassword({ token, password: values.newPassword }).unwrap();
                if(response?.status && response?.httpStatusCode === 200){
                  toast.success(response?.message);
                  navigate("/login")
                }
              } catch (error) {
                console.error("Password update failed", error);
              } finally {
                setSubmitting(false);
              }
            } else {
              console.error("Token not found in URL");
              toast.error("Token not found in URL");
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, handleChange, handleBlur, values, touched, errors }) => (
            <Form>
              <div className="mb-4 relative">
                <PasswordField
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4 relative">
                <PasswordField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex space-x-4 items-center">
                <Button
                  type="submit"
                  variant="contained"
                  className="w-full !bg-black"
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? 'Updating...' : 'Reset Password'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
