import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth-slice";

const rootReducer = combineReducers({
	auth: authSlice,
});

export default rootReducer;
