import {
  Button,
  CircularProgress,
  TextField,
  Modal,
  Box,
  Typography
} from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useSignUpMutation, useVerifyOtpLoginMutation } from '../../rtk-query/authApiSlice';
import { useUpdateLocalWishlistMutation } from '../../rtk-query/wishlistApiSlice';
import { useDispatch } from 'react-redux';
import { setWishlistItems } from '../../redux/wishlistSlice';
import { setToken } from '../../redux/userSlice';

const Signup = () => {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [signUp, { isLoading }] = useSignUpMutation();
  const [verifyOtpLogin, { isLoading: isOtpLoading }] = useVerifyOtpLoginMutation();
  // Formik form for the signup fields and validation schema

  const formik = useFormik({
    initialValues: {
      name: "",
      mobileNo: null,
      email: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      mobileNo: Yup.number().required("Phone Number is Required"),
      email: Yup.string().email("Invalid email address").required("Email is Required")
    }),
    onSubmit: async (values) => {
      const newData: any = {
        name: values?.name,
        mobileNo: values?.mobileNo,
        email: values?.email,
        organization: values?.name,
        platform: "GROYYO_DESIGN",
        verticalRequired: [3]
      };
      try {
        const response = await signUp(newData).unwrap();

        console.log(response, "signup");

        const responseData = response;

        if(responseData?.status){
          toast.success("Signup successful! Please verify OTP.");
          setIsOtpModalOpen(true);
        }

        
        // Generate OTP and open the OTP modal
        // const response = await generateOtp({ email: formik.values.email, platform: "GROYYO_DESIGN" }).unwrap();
  

      } catch (error: any) {
        console.log(error)
        toast.error("Signup failed: " + error?.data?.message || "Unexpected error occurred");
      }
    }
  });
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateLocalWishlist] = useUpdateLocalWishlistMutation();

  

  // Handle OTP verification submission
  const handleVerifyOtp = async () => {
    try {
      const response: any = await verifyOtpLogin({
        mobileNo: "null",
        email: formik.values.email,
        otpCode: otp,
        fcmToken: "",   
        deviceId: "",   
        platform: "GROYYO_DESIGN"
      }).unwrap();
      
      if (response?.status) {
        toast.success("OTP Verified Successfully!");
console.log(response, "response")
        // Store token and other user info
        dispatch(setToken({ token: response?.data?.access_token }));
        localStorage.setItem("authToken", JSON.stringify(response?.data?.access_token));
        localStorage.setItem('isAdmin', JSON.stringify(response?.data?.isAdmin));
        
        // Update local wishlist
        const productIds = JSON.parse(localStorage.getItem("localWishList") as string);
        await updateLocalWishlist({ token: response?.data?.access_token, payload: productIds }).then((res) => {
          dispatch(setWishlistItems(res?.data?.count));
          localStorage.removeItem("localWishList");
        });

        navigate("/");
      }
    } catch (error: any) {
      toast.error("OTP Verification failed: " + error?.data?.message || "Unexpected error occurred");
    }
  };

  return (
    <BasicLayout showFooter={false}>
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
          <Typography variant="h6">Create your account</Typography>
          
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            
            <TextField
              id="mobileNo"
              name="mobileNo"
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
              helperText={formik.touched.mobileNo && formik.errors.mobileNo}
            />
            
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
            
            <Button
              type="submit"
              variant="contained"
              className="w-[100%] h-[3.5rem] !bg-black !text-white rounded"
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
            </Button>
            
            <Typography variant="body2" className="w-full text-right">
              Already a user?{" "}
              <Link to={"/login"}>
                <span className="underline font-semibold">Log in</span>
              </Link>
            </Typography>
          </form>
        </div>
      </div>
      
      
      <Modal open={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg w-full flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-center">Enter OTP</h2>
            <TextField
              id="otp"
              name="otp"
              label="OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleVerifyOtp}
              disabled={isOtpLoading || !otp}
            >
              {isOtpLoading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
            <Button variant="text" onClick={()=>setIsOtpModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </BasicLayout>
  );
}

export default Signup;
