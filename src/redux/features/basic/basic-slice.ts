import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import basicService from "./basic-service";
import { displayError } from "../../../utils/errors";

const initialState = {
	theme: "light",
	notifications: [],
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
	"auth/login",
	async (_, thunkAPI) => {
		try {
			const res = await basicService.getNotifications();
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
			state.notifications = action.payload;
		});
	},
});

export default basicSlice.reducer;
