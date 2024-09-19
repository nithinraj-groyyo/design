import { Button, CircularProgress, TextField } from '@mui/material'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../../api/userApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import GoogleIcon from '../../assets/svg/auth/GoogleIcon';
import BasicLayout from '../../layouts/BasicLayout';

const Signup = () => {
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);

  const [isSignUpFormLoading, setIsSignUpFormLoading] = useState(false)

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is Required"),
      password: Yup.string()
      .required("Password is Required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/[0-9]/, "Password must contain at least one number.")
      .matches(/[@$!%*?&#]/, "Password must contain at least one special character.")
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSignUpFormLoading(true);

      const newData = {
        email: values.email,
        password: values.password,
      };
      try {
        const response = await createUser(newData);
        if(response?.status){
          toast.success("User Created Successfully!")
          resetForm(); 
          navigate("/login")
        }
      } catch (error: any) {
        toast.error("Login failed: "+error?.response?.data?.message);
      }finally {
        setIsSignUpFormLoading(false)
      }
    }
  });
  const handleGoogleAuth = () => {
    setIsGoogleAuthLoading(true);
    // window.location.href = url + "/users/auth/google?state=SIGN_UP";
  };
  return (
    <BasicLayout  showFooter={false}>
      <div className="flex relative min-h-screen opacity-65 bg-white">
        <div className="xxs:hidden lg:flex w-full flex-1 min-w-[40%] h-screen">
          <img className="object-cover w-full h-full" src="/images/auth/login_img_1.jpeg" alt="login_bg1" />
        </div>
        <div className="w-full lg:mt-0 flex-2 h-screen">
          <img className="object-cover w-full h-full" src="/images/auth/login_img_2.jpeg" alt="login_bg2" />
        </div>
      </div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(153, 153, 153, 0.3) 198.83%)"
          }}
          className="w-[30rem] rounded p-4 flex flex-col gap-4"
        >
          <div>Create your account</div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div>
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-[2rem]">
                <Button
                  type="submit"
                  variant="contained"
                  className="w-[100%] h-[3.5rem] !bg-black !text-white rounded"
                >
                  {isSignUpFormLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                {/* <div className="text-[#2D2D2A] font-light text-[1rem] text-center">or</div>
                <Button
                  onClick={handleGoogleAuth}
                  variant="contained"
                  className="w-[100%] h-[3.5rem] !bg-black !text-white rounded"
                  disabled={isGoogleAuthLoading}
                >
                  {isGoogleAuthLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>
                      <span className="mr-4">
                      <GoogleIcon />
                      </span>
                      <p>Sign Up with Google</p>
                    </>
                  )}
                </Button> */}
              </div>
              <div className="w-full text-right text-xs">
                Already a user?{" "}
                <Link to={"/login"}>
                  <span className="underline font-semibold">Log in</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BasicLayout>
  )
}

export default Signup
