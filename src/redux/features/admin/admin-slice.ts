import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./admin-service";
import { displayError } from "../../../utils/errors";
import { logout } from "../auth/auth-slice";

const initialState = {
	dashboardStats: {} as any,
};

export const getDashboardStats = createAsyncThunk(
	"admin/dashStats",
	async (filter: string, thunkAPI: any) => {
		try {
			const { token } = thunkAPI.getState().auth;
			const res = await adminService.dashboardStats(filter, token);
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			if (message.includes("Session expired")) {
				thunkAPI.dispatch(logout());
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getDashboardStats.fulfilled, (state, action) => {
			state.dashboardStats = action.payload;
		});
	},
});

export default adminSlice.reducer;
