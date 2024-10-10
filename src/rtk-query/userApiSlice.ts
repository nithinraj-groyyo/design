import apiSlice from "./apiSlice";

const userUrl = "user";
const token = JSON.parse(localStorage.getItem('authToken') as string);

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: ({currentPassword, newPassword}: {currentPassword: string, newPassword: string}) => ({
                url: `${userUrl}/change-password`,
                headers: {
					'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
				},
                method: 'POST',
                body: {currentPassword, newPassword}
            })
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: `${userUrl}/profile`,
                headers: {
					'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
				},
            }),
            providesTags: ["UserProfile"],
        }),
        updateUserProfile: builder.mutation({
            query: (payload) => ({
                url: `${userUrl}/update-profile`,
                method: "PUT",
                headers: {
					'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
				},
                body: payload
            }),
            invalidatesTags: ["UserProfile"]
        })
    })
});


export const {
    useChangePasswordMutation,
    useLazyGetUserProfileQuery,
    useUpdateUserProfileMutation
} = userApiSlice;