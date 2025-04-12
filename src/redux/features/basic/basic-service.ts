import { apiRequest } from "../../../utils/axiosInstance";

const getNotifications = async (page: number) => {
	const { data } = await apiRequest("baseUrl").get(
		`/notification/user-notification?page=${page || 1}`
	);
	return data;
};

const readNotification = async (id: any) => {
	const { data } = await apiRequest("baseUrl").get(
		`/notification/read/${id}`
	);
	return data;
};

const readAllNotifications = async () => {
	const { data } = await apiRequest("baseUrl").get(`/notification/readAll`);
	return data;
};

const saveTrialPick = async () => {
	const { data } = await apiRequest("baseUrl").post(
		`/business/start-trial`,
		{}
	);
	return data;
};

const updateOnboardingSteps = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/business/update-onboarding-steps`,
		obj
	);
	return data;
};

const dashboardStats = async (year: string, period: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/report/dashboard-report?year=${year}&period=${period}`
	);
	return data;
};

const allShops = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/shop/all${filters}`);
	return data;
};

const searchShops = async (filters: string, word: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/shop/search?search=${word}${filters}`
	);
	return data;
};

const allStaffs = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/user/all${filters}`);
	return data;
};

const searchStaff = async (filters: string, word: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/user/search?search=${word}${filters}`
	);
	return data;
};

const listWalkIns = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/customer/all${filters}`);
	return data;
};

const listSubDealers = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/subDealer/all${filters}`
	);
	return data;
};

const saveSettings = async () => {
	const { data } = await apiRequest("baseUrl").get(`/business/get-settings`);
	return data;
};

const paymentMethods = async () => {
	const { data } = await apiRequest("baseUrl").get(`/other/payment-methods`);
	return data;
};

const createWalkIn = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/other/payment-methods`,
		obj
	);
	return data;
};

const createSubdealer = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/subdealer/create`, obj);
	return data;
};

const editSubdealer = async (obj: any, id: number) => {
	const { data } = await apiRequest("baseUrl").patch(
		`/subdealer/update/${id}`,
		obj
	);
	return data;
};

const getCountries = async () => {
	const { data } = await apiRequest("baseUrl").get(`/other/countries`);
	return data;
};

const getStates = async () => {
	const { data } = await apiRequest("baseUrl").get(`/other/states`);
	return data;
};

const getExpenseCategories = async () => {
	const { data } = await apiRequest("baseUrl").get(`/expense/categories/all`);
	return data;
};

const enableSMS = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/subdealer/set-sms-notification`,
		obj
	);
	return data;
};

const enableSmsBusiness = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/business/set-sms-notification`,
		obj
	);
	return data;
};

const createBusiness = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/business/create`, obj);
	return data;
};

const businessDetails = async (id: any) => {
	const { data } = await apiRequest("baseUrl").get(`/business/view/${id}`);
	return data;
};

const updateBusiness = async (obj: any, id: any) => {
	const { data } = await apiRequest("baseUrl").patch(
		`/business/update/${id}`,
		obj
	);
	return data;
};

const switchBusiness = async (bizId: number) => {
	const { data } = await apiRequest("baseUrl").post(
		`/user/switch-business/${bizId}`,
		{}
	);
	return data;
};

const organizationReports = async () => {
	const { data } = await apiRequest("baseUrl").get(
		`/report/organization-dashboard-report`
	);
	return data.data;
};

const addOrRemoveUserBusiness = async (
	action: string,
	bizId: number,
	id: number
) => {
	let link = action == "add" ? "add-user" : "remove-user";
	const { data } = await apiRequest("baseUrl").patch(
		`/business/${bizId}/${link}/${id}`,
		{}
	);
	return data.data;
};

const currencyList = async () => {
	const { data } = await apiRequest("baseUrl").get(`/other/currencies`);
	return data.data;
};

const actionShop = async (action: string, id: string) => {
	const { data } = await apiRequest("baseUrl").post(`/shop/${action}/${id}`, {
		id,
	});
	return data.data;
};

const createShop = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/shop/create`, obj);
	return data.data;
};

const editShop = async (obj: any, id: string) => {
	const { data } = await apiRequest("baseUrl").post(
		`/shop/update/${id}`,
		obj
	);
	return data.data;
};

const deleteShop = async (id: string) => {
	const { data } = await apiRequest("baseUrl").delete(`/shop/delete/${id}`);
	return data.data;
};

const getLogs = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/report/activity-log${filters}`
	);
	return data.data;
};

const closeAccount = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/organization/${id}/delete`,
		obj
	);
	return data;
};

const setWaitingPeriod = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/business/set-waiting-period`,
		obj
	);
	return data;
};

const setCreditLimit = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/business/set-credit-limit`,
		obj
	);
	return data;
};

const importPermit = async (allow: boolean, id: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/business/onboarding-${allow ? "allow" : "stop"}/${id}`,
		{}
	);
	return data;
};

const changePassword = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/user/update-my-password`,
		obj
	);
	return data;
};

const setNotification = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/business/set-notification`,
		obj
	);
	return data;
};

const loadFaqs = async () => {
	const { data } = await apiRequest("baseUrl").get(`/other/faq`);
	return data.data;
};

const deleteBusiness = async (id: any, obj: any) => {
	const data = await apiRequest("baseUrl").post(
		`/business/delete/${id}`,
		obj
	);
	return data;
};

const actionUser = async (action: string, id: string) => {
	const { data } = await apiRequest("baseUrl").patch(
		`/user/${action}/${id}`,
		{}
	);
	return data.data;
};

const updateUser = async (obj: any, id: number) => {
	const { data } = await apiRequest("baseUrl").put(`/user/update/${id}`, obj);
	return data.data;
};

const deleteUser = async (id: string) => {
	const { data } = await apiRequest("baseUrl").delete(`/user/delete/${id}`);
	return data.data;
};

const allCarousels = async () => {
	const { data } = await apiRequest("baseUrl").get(`/other/carousels`);
	return data.data;
};

const basicService = {
	getNotifications,
	readAllNotifications,
	readNotification,
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
	getLogs,
	updateBusiness,
	closeAccount,
	setWaitingPeriod,
	setCreditLimit,
	enableSmsBusiness,
	importPermit,
	changePassword,
	setNotification,
	loadFaqs,
	deleteBusiness,
	actionUser,
	updateUser,
	businessDetails,
	deleteUser,
	allCarousels,
};

export default basicService;
