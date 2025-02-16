import { apiRequest } from "../../../utils/axiosInstance";

const login = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/auth/login`, obj);
	return data?.data;
};

const register = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/auth/register`, obj);
	return data?.data;
};

const verifyOtp = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/auth/verify-email`,
		obj
	);
	return data?.data;
};

const resendOTP = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/auth/resend-email-verification`,
		obj
	);
	return data?.data;
};

const forgotPassword = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/auth/send-password-reset-token`,
		obj
	);
	return data;
};

const resetPassword = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/auth/reset-password`,
		obj
	);
	return data;
};

const getProfile = async () => {
	const { data } = await apiRequest("baseUrl").get(`/user/profile`);
	return data;
};

const authService = {
	login,
	forgotPassword,
	resetPassword,
	getProfile,
	register,
	verifyOtp,
	resendOTP,
};

export default authService;
