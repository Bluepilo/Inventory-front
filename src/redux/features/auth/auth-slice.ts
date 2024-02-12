import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayError } from "../../../utils/errors";
import authService from "./auth-service";
import { toast } from "react-toastify";
import { userDetailsType } from "../../../utils/types";
import axios from "axios";

const initialState = {
	details: userDetailsType,
	loading: false,
	error: null as any,
	token: "",
};

export const login = createAsyncThunk(
	"auth/login",
	async (data: any, thunkAPI) => {
		try {
			const res = await authService.login(data);
			let response = res.data;
			axios.defaults.headers.common = {
				Authorization: `Bearer ${response?.accessToken}`,
				"Content-Type": "application/json",
			};
			toast.success(`Welcome back, ${response?.user?.firstName}`);
			return response;
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const userProfile = createAsyncThunk(
	"auth/profile",
	async (id: number, thunkAPI: any) => {
		try {
			const { token } = thunkAPI.getState().auth;
			const res = await authService.getProfile(id, token);
			return res.data;
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearLoad: (state) => {
			state.loading = false;
		},
		logout: (state) => {
			state.details = {};
			state.error = null;
			state.loading = false;
			state.token = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.loading = false;
			state.details = action.payload.user;
			state.token = action.payload.accessToken;
			state.error = null;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(userProfile.fulfilled, (state, action) => {
			state.details = action.payload;
		});
	},
});

export const { logout, clearLoad } = authSlice.actions;

export default authSlice.reducer;
