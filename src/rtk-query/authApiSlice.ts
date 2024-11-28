import userApiSlice from "./userApiSlice";

const authUrl = "/login"

const authApiSlice = userApiSlice.injectEndpoints({
    endpoints: (builder) => ({
      signUp: builder.mutation({
        query: ({ name, mobileNo, email, organization, platform, verticalRequired }) => ({
          url: `${authUrl}/signup`,
          headers: {
            'Content-type': 'application/json',
          },
          method: 'POST',
          body: { name, mobileNo, email, organization, platform, verticalRequired },
        }),
      }),
      generateOtp: builder.query({
        query: ({ email, platform }) => ({
          url: `${authUrl}/generate-otp`,
          method: 'GET',
          params: { email, platform },
        }),
      }),
      verifyOtpLogin: builder.mutation({
        query: ({ mobileNo, email, otpCode, fcmToken, deviceId, platform }) => ({
          url: `${authUrl}/login`,
          headers: {
            'Content-type': 'application/json',
          },
          method: 'POST',
          body: { mobileNo, email, otpCode, fcmToken, deviceId, platform },
        }),
      }),
    }),
  });
  
  export const  {
    useSignUpMutation,
    useLazyGenerateOtpQuery,
    useVerifyOtpLoginMutation
  } = authApiSlice;