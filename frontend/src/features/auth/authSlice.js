import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { dispatch }) => {
        const res = await api.post("/auth/login", credentials);
        localStorage.setItem("token", res.data.token);
        return res.data;
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { dispatch }) => {
        const res = await api.post("/auth/register", data);
        
        const loginRes = await api.post("/auth/login", {
            email: data.email,
            password: data.password
        });
        localStorage.setItem("token", loginRes.data.token);
        return loginRes.data;
    }
);

export const getUserProfile = createAsyncThunk(
    "auth/profile",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/auth/me");
            return data.user || data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token"),
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user || action.payload;
            state.token = action.payload.token;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user || action.payload;
            state.token = action.payload.token;
            state.error = null;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        
        builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            state.error = action.payload || 'Failed to load profile';
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
