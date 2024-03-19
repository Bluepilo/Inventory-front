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

const allShops = async (token: string, filters: string) => {
	const { data } = await axios.get(`${config.baseUrl}/shop/all${filters}`, {
		headers: authHeader(token),
	});
	return data;
};

const searchShops = async (token: string, filters: string, word: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/shop/search?search=${word}${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const allStaffs = async (token: string, filters: string) => {
	const { data } = await axios.get(`${config.baseUrl}/user/all${filters}`, {
		headers: authHeader(token),
	});
	return data;
};

const searchStaff = async (token: string, filters: string, word: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/user/search?search=${word}${filters}`,
		{
			headers: authHeader(token),
		}
	);
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

const switchBusiness = async (token: string, bizId: number) => {
	const { data } = await axios.post(
		`${config.baseUrl}/user/switch-business/${bizId}`,
		{},
		{
			headers: authHeader(token),
		}
	);
	return data;
};

const organizationReports = async (token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/report/organization-dashboard-report`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const addOrRemoveUserBusiness = async (
	token: string,
	action: string,
	bizId: number,
	id: number
) => {
	let link = action == "add" ? "add-user" : "remove-user";
	const { data } = await axios.patch(
		`${config.baseUrl}/business/${bizId}/${link}/${id}`,
		{},
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const currencyList = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/other/currencies`, {
		headers: authHeader(token),
	});
	return data.data;
};

const actionShop = async (token: string, action: string, id: string) => {
	const { data } = await axios.post(
		`${config.baseUrl}/shop/${action}/${id}`,
		{ id },
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const createShop = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/shop/create`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const editShop = async (token: string, obj: any, id: string) => {
	const { data } = await axios.post(
		`${config.baseUrl}/shop/update/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const deleteShop = async (token: string, id: string) => {
	const { data } = await axios.delete(`${config.baseUrl}/shop/delete/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
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
	switchBusiness,
	organizationReports,
	addOrRemoveUserBusiness,
	currencyList,
	searchShops,
	actionShop,
	createShop,
	editShop,
	deleteShop,
	searchStaff,
};

export default basicService;
