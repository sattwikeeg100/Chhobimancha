import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${APIURL}/users/login`, payload);
            return response.data; // userdata
        } catch (error) {
            console.error(error);
            // Return a rejected value to trigger the rejected action
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: getUserFromLocalStorage(),
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // userdata
                localStorage.setItem("user", JSON.stringify(action.payload));
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action.error.message);
                if (action.payload && action.payload.message) {
                    state.error = action.payload.message; // Assuming action.payload is an object
                } else {
                    state.error = action.payload || "An error occurred";
                }
            });
    },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;