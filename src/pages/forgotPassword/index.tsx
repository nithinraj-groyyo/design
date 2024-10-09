import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ForgotPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = (setShowPassword: React.Dispatch<React.SetStateAction<boolean>>, showPassword: boolean) => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md m-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>

        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              navigate('/login');
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="mb-4 relative">
                <label
                  htmlFor="newPassword"
                  className="block text-lg font-medium text-gray-800"
                >
                  New Password
                </label>
                <div className="relative mt-2">
                  <TextField
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Enter your new password"
                  />
                  <span
                    onClick={() => togglePasswordVisibility(setShowNewPassword, showNewPassword)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    {showNewPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.478 0-8.268-2.943-9.543-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3l18 18m-2.2-2.2A9.97 9.97 0 0012 15c-3.866 0-7.1-2.239-8.8-5.6A9.966 9.966 0 0112 5c2.489 0 4.749.906 6.533 2.4m3.034 3.4c.2.486.367.986.499 1.5"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-lg font-medium text-gray-800"
                >
                  Confirm Password
                </label>
                <div className="relative mt-2">
                  <TextField
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Confirm your new password"
                  />
                  <span
                    onClick={() => togglePasswordVisibility(setShowConfirmPassword, showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.478 0-8.268-2.943-9.543-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3l18 18m-2.2-2.2A9.97 9.97 0 0012 15c-3.866 0-7.1-2.239-8.8-5.6A9.966 9.966 0 0112 5c2.489 0 4.749.906 6.533 2.4m3.034 3.4c.2.486.367.986.499 1.5"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className={`w-full py-3 px-5 bg-black text-white font-medium text-base rounded-md hover:bg-transparent hover:text-black hover:border transition duration-300 ${
                    isSubmitting || !isValid ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Confirm
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
