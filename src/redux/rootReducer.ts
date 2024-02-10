import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth-slice";
import basicSlice from "./features/basic/basic-slice";

const rootReducer = combineReducers({
	basic: basicSlice,
	auth: authSlice,
});

export default rootReducer;
