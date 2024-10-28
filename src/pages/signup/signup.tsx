import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useState } from 'react';
import GoogleIcon from '../../assets/svg/auth/GoogleIcon';
import BasicLayout from '../../layouts/BasicLayout';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSignUpMutation } from '../../rtk-query/authApiSlice';
import { jwtDecode } from 'jwt-decode';
import { useUpdateLocalWishlistMutation } from '../../rtk-query/wishlistApiSlice';
import { useDispatch } from 'react-redux';
import { setWishlistItems } from '../../redux/wishlistSlice';
import { setToken } from '../../redux/userSlice';

const Signup = () => {
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);

  const [signUp, {isLoading}] = useSignUpMutation()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateLocalWishlist] = useUpdateLocalWishlistMutation()


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
      const newData = {
        email: values?.email,
        password: values?.password,
      };
      try {
        const response = await signUp(newData).unwrap();
        if(response?.status && response?.httpStatusCode === 201){
          toast.success(response?.message);
          dispatch(setToken({token: response?.data?.access_token}));
          localStorage.setItem("authToken", JSON.stringify(response?.data?.access_token));
          localStorage.setItem('isAdmin', JSON.stringify(response?.data?.isAdmin));

          const decodedToken: any = jwtDecode(response?.data?.access_token);
          localStorage.setItem('userId', JSON.stringify(decodedToken?.id));

          const productIds = JSON.parse(localStorage.getItem("localWishList") as string);
          await updateLocalWishlist({token: response?.data?.access_token, payload: productIds})?.then((res) => {
            const response = res?.data;
            dispatch(setWishlistItems(response?.data?.count));
            localStorage.removeItem("localWishList")
          })

          resetForm(); 
          navigate("/")
        }
      } catch (error: any) {
        console.log("Error Response: ", error);
        toast.error("Signup failed: " + error?.data?.message || "Unexpected error occurred");
      }
    }
  });
  const handleGoogleAuth = () => {
    setIsGoogleAuthLoading(true);
    // window.location.href = url + "/users/auth/google?state=SIGN_UP";
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
          className="w-[25rem] xl:w-[30rem] rounded p-4 flex flex-col gap-4"
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
                type={showPassword ? 'text' : 'password'}
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
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-[2rem]">
                <Button
                  type="submit"
                  variant="contained"
                  className="w-[100%] h-[3.5rem] !bg-black !text-white rounded"
                >
                  {isLoading ? (
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
