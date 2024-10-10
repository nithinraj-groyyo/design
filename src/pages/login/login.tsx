import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BasicLayout from "../../layouts/BasicLayout";
import { useForgotPasswordMutation, useSignInMutation } from "../../rtk-query/userApiSlice";

const Login = () => {
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiData, setApiData] = useState();
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  const modalToggleHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is Required"),
      password: Yup.string()
        .required("Password is Required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
        .matches(/[0-9]/, "Password must contain at least one number.")
        .matches(/[@$!%*?&#]/, "Password must contain at least one special character."),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newData = {
          email: values.email,
          password: values.password,
        };

        const response = await signIn(newData).unwrap();
        if (response?.status && response?.httpStatusCode === 201) {
          toast.success(response?.message);
          localStorage.setItem("authToken", response?.data?.access_token);
          resetForm();
          navigate("/");
        }
      } catch (error: any) {
        toast.error("Login failed: " + error?.response?.data?.message);
      }
    },
  });

  // Handle email submission for password reset
  const handleSendEmail = async (email: string) => {
    try {
      const response = await forgotPassword({ email }).unwrap();
      setApiData(response);
      toast.success("Reset link sent to your email!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send reset link");
    }
    console.log(apiData, "keshav")
  };

  const resetFormik = useFormik({
    initialValues: { resetEmail: "" },
    validationSchema: Yup.object({
      resetEmail: Yup.string().email("Invalid email address").required("Email is Required"),
    }),
    onSubmit: (values) => {
      handleSendEmail(values.resetEmail);
      modalToggleHandler();
    },
  });

  return (
    <BasicLayout showFooter={false}>
      <div className="flex relative min-h-screen opacity-65 bg-white">
        <div className="xxs:hidden lg:flex w-full flex-1 min-w-[40%] h-screen">
          <img
            className="object-cover w-full h-full"
            src="/images/auth/login_img_1.jpeg"
            alt="login_bg1"
          />
        </div>
        <div className="w-full lg:mt-0 flex-2 h-screen">
          <img
            className="object-cover w-full h-full"
            src="/images/auth/login_img_2.jpeg"
            alt="login_bg2"
          />
        </div>
      </div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(153, 153, 153, 0.3) 198.83%)",
          }}
          className="w-[30rem] rounded p-4 flex flex-col gap-4"
        >
          <div>Login with your Credentials</div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              className="w-[100%] h-[3.5rem] !bg-black !text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Log in"}
            </Button>
            <div className="w-full text-right text-xs flex justify-between">
              <div
                className="whitespace-nowrap cursor-pointer underline font-semibold"
                onClick={modalToggleHandler}
              >
                Forgot Password
              </div>
              <div>
                Don't have an account?{" "}
                <Link to={"/signup"}>
                  <span className="underline font-semibold">Sign up</span>
                </Link>
              </div>
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
                      <p>Log In with Google</p>
                    </>
                  )}
                </Button> */}
            </div>
          </form>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={modalToggleHandler}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col gap-8 bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-3xl font-semibold">Forgot your password</h2>
            <p className="text-gray-600 text-sm">
              Please enter the email address you'd like your password reset information sent to.
            </p>
            <form onSubmit={resetFormik.handleSubmit} className="flex flex-col gap-4">
              <TextField
                id="reset-email"
                name="resetEmail"
                label="Enter email address"
                variant="outlined"
                placeholder="Your email address"
                fullWidth
                value={resetFormik.values.resetEmail}
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
                error={resetFormik.touched.resetEmail && Boolean(resetFormik.errors.resetEmail)}
                helperText={resetFormik.touched.resetEmail && resetFormik.errors.resetEmail}
                className="p-2"
              />
              <Button
                type="submit"
                variant="contained"
                className="!bg-black !text-white rounded-lg"
                disabled={isLoading}
              >
                Request reset link
              </Button>
              <Button
                variant="text"
                className="!text-black text-sm"
                onClick={modalToggleHandler}
              >
                Back to Login
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </BasicLayout>
  );
};

export default Login;
