import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth-slice";
import basicSlice from "./features/basic/basic-slice";
import adminSlice from "./features/admin/admin-slice";

const rootReducer = combineReducers({
	basic: basicSlice,
	auth: authSlice,
	admin: adminSlice,
});

export default rootReducer;
