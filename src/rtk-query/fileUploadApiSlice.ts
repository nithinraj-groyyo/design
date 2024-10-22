import apiSlice from "./apiSlice";

const fileUrl = "file"
const token = JSON.parse(localStorage.getItem('authToken') as string);

const fileUploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadSingleFile: builder.mutation({
            query: (file: File) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: `${fileUrl}/upload`,
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
            },
        })
    })
})

export const {
    useUploadSingleFileMutation
} = fileUploadApiSlice