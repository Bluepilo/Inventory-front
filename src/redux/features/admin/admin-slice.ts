import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./admin-service";
import { displayError } from "../../../utils/errors";

const initialState = {
	dashboardStats: {} as any,
};

export const getDashboardStats = createAsyncThunk(
	"admin/dashStats",
	async (filter: string, thunkAPI: any) => {
		try {
			const res = await adminService.dashboardStats(filter);
			return res.data;
		} catch (error) {
			const message = displayError(error, false);

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
