import apiSlice from "./apiSlice";
import userApiSlice from "./userApiSlice";

const userUrl = "user";
const token = JSON.parse(localStorage.getItem('authToken') as string);

const profileApiSlice = userApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => ({
                url: `${userUrl}/change-password`,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                method: 'POST',
                body: { currentPassword, newPassword },
            }),
        }),
        getUserProfile: builder.query({
            query: ({ authToken }: { authToken?: string }) => ({
                url: `${userUrl}/detail`,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken ?? token}`,
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
                    'Authorization': `Bearer ${token}`,
                },
                body: payload,
            }),
            invalidatesTags: ["UserProfile"],
        }),
        updatePassword: builder.mutation({
            query: ({ token, password }: { token: string; password: string }) => ({
                url: `/auth/updatePassword`,
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "PATCH",
                body: { password },
            }),
        }),
        superAdmin: builder.mutation({
            query: ({ token, payload }: { token: string; payload:{factoryId: number} }) => ({
                url: `/factories/generate-token`,
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: payload,
            }),
            invalidatesTags: ["UserProfile"],
        }),
    }),
});

export const {
    useChangePasswordMutation,
    useLazyGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useUpdatePasswordMutation,
    useSuperAdminMutation,
} = profileApiSlice;
