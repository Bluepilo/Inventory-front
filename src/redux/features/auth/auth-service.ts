import axios from "axios";

import config from "../../../utils/config";
import { headers } from "../../../utils/headers";

const login = async (obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/auth/login`, obj, {
		headers,
	});
	return data;
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

const authService = {
	login,
	forgotPassword,
	resetPassword,
};

export default authService;
