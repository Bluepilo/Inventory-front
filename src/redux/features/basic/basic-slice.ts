import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import basicService from "./basic-service";
import { displayError } from "../../../utils/errors";
import { notificationType } from "../../../utils/types";

const initialState = {
	theme: "light",
	notify: notificationType,
	dashboardStats: {} as any,
};

export const changeTheme = createAsyncThunk(
	"basic/theme",
	async (data: string, thunkAPI) => {
		try {
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const getNotifications = createAsyncThunk(
	"basic/notification",
	async (_, thunkAPI: any) => {
		try {
			const { token } = thunkAPI.getState().auth;
			const res = await basicService.getNotifications(token);
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getDashboardStats = createAsyncThunk(
	"basic/dashStats",
	async (data: any, thunkAPI: any) => {
		try {
			const { token } = thunkAPI.getState().auth;
			const res = await basicService.dashboardStats(
				data.year,
				data.period,
				token
			);
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const basicSlice = createSlice({
	name: "basic",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(changeTheme.fulfilled, (state, action) => {
			state.theme = action.payload || "light";
		});
		builder.addCase(getNotifications.fulfilled, (state, action) => {
			state.notify = action.payload;
		});
		builder.addCase(getDashboardStats.fulfilled, (state, action) => {
			state.dashboardStats = action.payload;
		});
	},
});

export default basicSlice.reducer;
