import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserInitialState { 
    authToken: string | undefined;
}

const initialState: IUserInitialState = {
    authToken: undefined
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<{token: string}>) => {
            const { token } = action.payload;
            state.authToken = token;
        }
    }
});


export const {
    setToken
} = userSlice.actions;

export default userSlice.reducer;