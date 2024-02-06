import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayError } from "../../../utils/errors";

const initialState = {
	details: null,
	loading: false,
	error: null,
};

// Login
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return true;
	} catch (error) {
		const message = displayError(error);
		return thunkAPI.rejectWithValue(message);
	}
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {},
	},
	extraReducers: (builder) => {},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
