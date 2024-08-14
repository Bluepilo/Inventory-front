import axios from "axios";

import config from "../../../utils/config";
import { authHeader, headers } from "../../../utils/headers";

const login = async (obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/auth/login`, obj, {
		headers,
	});
	return data;
};

const register = async (obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/auth/register`, obj, {
		headers,
	});
	return data?.data;
};

const verifyOtp = async (obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/auth/verify-email`,
		obj,
		{
			headers,
		}
	);
	return data?.data;
};

const resendOTP = async (obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/auth/resend-email-verification`,
		obj,
		{
			headers,
		}
	);
	return data?.data;
};

const forgotPassword = async (obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/auth/send-password-reset-token`,
		obj,
		{
			headers,
		}
	);
	return data;
};

const resetPassword = async (obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/auth/reset-password`,
		obj,
		{
			headers,
		}
	);
	return data;
};

const getProfile = async (id: number, token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/user/profile`, {
		headers: authHeader(token),
	});
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
