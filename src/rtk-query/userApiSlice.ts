import apiSlice from "./apiSlice";

const userUrl = "user";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({email, password}: {email:string, password: string}) => ({
                url: `${userUrl}/signup`,
                headers: {
					'Content-type': 'application/json',
				},
				method: 'POST',
                body: {email, password}
            })
        }),
        signIn: builder.mutation({
            query: ({email, password}: {email:string, password: string}) => ({
                url: `${userUrl}/login`,
                headers: {
					'Content-type': 'application/json',
				},
				method: 'POST',
                body: {email, password}
            })
        }),
        forgotPassword: builder.mutation({
            query: ({ email }: { email: string }) => ({
                url: `/auth/forgotPassword`,
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'POST',
                body: { email },
            }),
        }),
        updatePassword: builder.mutation({
            query: ({ password }: { password: string }) => ({
              url: `/auth/updatePassword`,
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
              method: "PATCH",
              body: { password },
            }),
          }),
    })
});


export const {
    useSignUpMutation,
    useSignInMutation,
    useForgotPasswordMutation,
    useUpdatePasswordMutation

} = userApiSlice;