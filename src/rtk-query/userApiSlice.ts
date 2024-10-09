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
        })
    })
});


export const {
    useSignUpMutation
} = userApiSlice;