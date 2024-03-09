import axios from "axios";
import config from "../../../utils/config";
import { authHeader, headers } from "../../../utils/headers";

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

const listWalkIns = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/customer/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const listSubDealers = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/subDealer/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const saveSettings = async (token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/business/get-settings`,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const paymentMethods = async (token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/other/payment-methods`,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const createWalkIn = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/other/payment-methods`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const createSubdealer = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/subdealer/create`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const editSubdealer = async (token: string, obj: any, id: number) => {
	const { data } = await axios.patch(
		`${config.baseUrl}/subdealer/update/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const getCountries = async () => {
	const { data } = await axios.get(`${config.baseUrl}/other/countries`, {
		headers,
	});
	return data;
};

const getStates = async () => {
	const { data } = await axios.get(`${config.baseUrl}/other/states`, {
		headers,
	});
	return data;
};

const getExpenseCategories = async (token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/expense/categories/all`,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const enableSMS = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/subdealer/set-sms-notification`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const createBusiness = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/business/create`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const basicService = {
	getNotifications,
	saveTrialPick,
	updateOnboardingSteps,
	dashboardStats,
	allShops,
	allStaffs,
	listWalkIns,
	listSubDealers,
	saveSettings,
	paymentMethods,
	createWalkIn,
	createSubdealer,
	editSubdealer,
	getCountries,
	getStates,
	enableSMS,
	getExpenseCategories,
	createBusiness,
};

export default basicService;
