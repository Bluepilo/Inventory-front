import { apiRequest } from "../../../utils/axiosInstance";

const loadCentralWallet = async (id: number) => {
	const { data } = await apiRequest("smsUrl", id).get(`/settings`);
	return data.data;
};

const editSettings = async (id: number, obj: any) => {
	const { data } = await apiRequest("smsUrl", id).post(
		`/settings/update-settings`,
		obj
	);
	return data.data;
};

const topCentralWallet = async (id: number, obj: any) => {
	const { data } = await apiRequest("smsUrl", id).post(
		`/settings/top-wallet`,
		obj
	);
	return data.data;
};

const allWallets = async (id: number) => {
	const { data } = await apiRequest("smsUrl", id).get(
		`/wallet/all-org-wallets`
	);
	return data.data;
};

const topSmsWallets = async (id: number, obj: any) => {
	const { data } = await apiRequest("smsUrl", id).post(
		`/wallet/top-org-wallets`,
		obj
	);
	return data.data;
};

const topAdminWallet = async (id: number, obj: any) => {
	const { data } = await apiRequest("smsUrl", id).post(
		`/wallet/top-admin-wallet`,
		obj
	);
	return data.data;
};

const allTransactions = async (
	id: number,
	startDate: any,
	endDate: any,
	channel: any,
	limit: number,
	page: number,
	search: string
) => {
	const { data } = await apiRequest("smsUrl", id).get(
		`/wallet/all-transactions?startDate=${startDate}&endDate=${endDate}&channel=${channel}&limit=${limit}&page=${page}&search=${search}`
	);
	return data.data;
};

const getHistory = async (
	id: number,
	startDate: any,
	endDate: any,
	limit: number,
	page: number
) => {
	const { data } = await apiRequest("smsUrl", id).get(
		`/sms/all-sms-history?startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${page}`
	);
	return data.data;
};

const getTransactionReport = async (
	id: number,
	startDate: any,
	endDate: any
) => {
	const { data } = await apiRequest("smsUrl", id).get(
		`/wallet/all-transactions-report?startDate=${startDate}&endDate=${endDate}`
	);
	return data.data;
};

const getHistoryReport = async (id: number, startDate: any, endDate: any) => {
	const { data } = await apiRequest("smsUrl", id).get(
		`/sms/sms-report?startDate=${startDate}&endDate=${endDate}`
	);
	return data.data;
};

const verifyTransaction = async (id: number, obj: any) => {
	const { data } = await apiRequest("smsUrl", id).post(
		`/wallet/verify-payment`,
		obj
	);
	return data.data;
};

const smsGraph = async (id: number, startDate: any, endDate: any) => {
	const { data } = await apiRequest("smsUrl", id).get(
		`/sms/sms-graph?startDate=${startDate}&endDate=${endDate}`
	);
	return data.data;
};

const smsService = {
	loadCentralWallet,
	topCentralWallet,
	allWallets,
	topSmsWallets,
	allTransactions,
	getHistory,
	getHistoryReport,
	editSettings,
	verifyTransaction,
	smsGraph,
	getTransactionReport,
	topAdminWallet,
};

export default smsService;
