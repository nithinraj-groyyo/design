import apiSlice from "./apiSlice";

const userUrl = "auth";
const token = JSON.parse(localStorage.getItem('authToken') as string);

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
    })
});


export const {
    useSignUpMutation,
    useSignInMutation,
} = userApiSlice;