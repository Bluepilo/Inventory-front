import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getNotifications = async (token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/notification/user-notification`,
		{ headers: authHeader(token) }
	);
	return data;
};

const saveTrialPick = async () => {
	const { data } = await axios.post(
		`${config.baseUrl}/business/start-trial`,
		{}
	);
	return data;
};

const updateOnboardingSteps = async (obj: any, token: string) => {
	const { data } = await axios.post(
		`${config.baseUrl}/business/update-onboarding-steps`,
		obj,
		{ headers: authHeader(token) }
	);
	return data;
};

const dashboardStats = async (year: string, period: string, token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/report/dashboard-report?year=${year}&period=${period}`,
		{ headers: authHeader(token) }
	);
	return data;
};

const allShops = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/shop/all?all=true`, {
		headers: authHeader(token),
	});
	return data;
};

const allStaffs = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/user/all?all=true`, {
		headers: authHeader(token),
	});
	return data;
};

const basicService = {
	getNotifications,
	saveTrialPick,
	updateOnboardingSteps,
	dashboardStats,
	allShops,
	allStaffs,
};

export default basicService;
