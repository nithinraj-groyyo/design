import {
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import {  useLazyGenerateOtpQuery, useVerifyOtpLoginMutation } from "../../rtk-query/authApiSlice";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/userSlice";
import { setWishlistItems } from "../../redux/wishlistSlice";
import { useUpdateLocalWishlistMutation } from "../../rtk-query/wishlistApiSlice";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ generateOtp, {isLoading} ] = useLazyGenerateOtpQuery();
  const [verifyOtpLogin] = useVerifyOtpLoginMutation();
  const [updateLocalWishlist] = useUpdateLocalWishlistMutation();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await generateOtp({ email: formik.values.email, platform: "GROYYO_DESIGN" }).unwrap();

        console.log(response, "signin");

        toast.success("OTP sent to your email!");
        setIsModalOpen(true)
        // modalToggleHandler();
      } catch (error:any) {
        console.log(error, "error")
        toast.error("Failed to send OTP", error);
      }
    },
  });

  const modalToggleHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleVerifyOtp = async () => {
    setIsVerifyLoading(true);
    try {
      const response: any = await verifyOtpLogin({
        email: formik.values.email, otpCode: otp, platform: "GROYYO_DESIGN",
        mobileNo: "",
        fcmToken: "",
        deviceId: ""
      }).unwrap();
      if (response?.status) {
        toast.success("Login successful!");
        dispatch(setToken({ token: response?.result?.token }));
        localStorage.setItem("authToken", JSON.stringify(response?.result?.token));
        localStorage.setItem('isAdmin', JSON.stringify(response?.result?.role?.name === "ADMIN"));

        const productIds = JSON.parse(localStorage.getItem("localWishList") as string);
        await updateLocalWishlist({ token: response?.result?.token, payload: productIds }).then((res) => {
          dispatch(setWishlistItems(res?.data?.count));
          localStorage.removeItem("localWishList");
        });

        navigate("/");
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      toast.error("OTP verification failed");
    } finally {
      setIsVerifyLoading(false);
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
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(153, 153, 153, 0.3) 198.83%)",
          }}
          className="w-[25rem] xl:w-[30rem] rounded p-4 flex flex-col gap-4"
        >
          <div>Login with your Credentials</div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              autoFocus
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
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Generate OTP"}
            </Button>
          </form>
          <Typography variant="body2" className="w-full text-right">
              New user?{" "}
              <Link to={"/signup"}>
                <span className="underline font-semibold">Sign up</span>
              </Link>
            </Typography>        </div>
      </div>

      <Modal open={isModalOpen} onClose={modalToggleHandler}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg w-full flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-center">Enter OTP</h2>
            <TextField
              id="otp"
              name="otp"
              label="OTP"
              variant="outlined"
              fullWidth
              autoFocus
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleVerifyOtp}
              disabled={isVerifyLoading || !otp}
            >
              {isVerifyLoading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
            <Button variant="text" onClick={modalToggleHandler}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </BasicLayout>
  );
};

export default Login;
