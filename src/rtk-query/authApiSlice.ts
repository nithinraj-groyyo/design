import apiSlice from "./apiSlice";

const authUrl = "auth";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({email, password}: {email:string, password: string}) => ({
                url: `${authUrl}/signup`,
                headers: {
					'Content-type': 'application/json',
				},
				method: 'POST',
                body: {email, password}
            })
        }),
        signIn: builder.mutation({
            query: ({email, password}: {email:string, password: string}) => ({
                url: `${authUrl}/login`,
                headers: {
					'Content-type': 'application/json',
				},
				method: 'POST',
                body: {email, password}
            })
        }),
        forgotPassword: builder.mutation({
            query: ({ email }: { email: string }) => ({
                url: `${authUrl}/forgotPassword`,
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'POST',
                body: { email },
            }),
        }),
    })
});


export const {
    useSignUpMutation,
    useSignInMutation,
    useForgotPasswordMutation,
} = userApiSlice;