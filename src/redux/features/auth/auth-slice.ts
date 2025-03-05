import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayError } from "../../../utils/errors";
import authService from "./auth-service";
import { toast } from "react-toastify";
import { userDetailsType } from "../../../utils/types";

const initialState = {
	details: userDetailsType,
	loading: false,
	error: null as any,
	token: "",
	referralCode: "",
	currency: "",
	showSubModal: false,
};

export const login = createAsyncThunk(
	"auth/login",
	async (data: any, thunkAPI) => {
		try {
			const res = await authService.login(data);
			toast.success(`Welcome back, ${res?.user?.firstName}`);
			localStorage.setItem("@savedtoken", res?.accessToken);
			return res;
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const subModalAction = createAsyncThunk(
	"auth/subModal",
	async (data: boolean) => {
		try {
			return data;
		} catch (error) {}
	}
);

export const userProfile = createAsyncThunk(
	"auth/profile",
	async (_, thunkAPI: any) => {
		try {
			const res = await authService.getProfile();
			return res.data;
		} catch (error) {
			const message = displayError(error, true);
			if (message.includes("Session expired")) {
				thunkAPI.dispatch(logout());
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const saveReferralCode = createAsyncThunk(
	"auth/referral",
	async (code: string) => {
		try {
			return code;
		} catch (error) {
			console.log(error);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearLoad: (state) => {
			state.loading = false;
			state.error = null;
		},
		clearReferralCode: (state) => {
			state.referralCode = "";
		},
		logout: (state) => {
			localStorage.removeItem("@savedtoken");
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
			if (action.payload?.user?.business) {
				state.currency =
					action?.payload?.user?.business?.currency?.symbol ||
					action?.payload?.user?.business.currencyCode;
			}
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(userProfile.fulfilled, (state, action) => {
			state.details = action.payload;
			state.currency =
				action?.payload?.business?.currency?.symbol ||
				action?.payload?.business.currencyCode;
		});
		builder.addCase(saveReferralCode.fulfilled, (state, action) => {
			state.referralCode = action.payload || "";
		});
		builder.addCase(subModalAction.fulfilled, (state, action) => {
			state.showSubModal = action.payload || false;
		});
	},
});

export const { logout, clearLoad, clearReferralCode } = authSlice.actions;

export default authSlice.reducer;
