import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const loadCentralWallet = async (token: string, id: number) => {
	const { data } = await axios.get(`${config.smsUrl}/settings`, {
		headers: { ...authHeader(token), UserId: id },
	});
	return data.data;
};

const editSettings = async (token: string, id: number, obj: any) => {
	const { data } = await axios.post(
		`${config.smsUrl}/settings/update-settings`,
		obj,
		{
			headers: { ...authHeader(token), UserId: id },
		}
	);
	return data.data;
};

const topCentralWallet = async (token: string, id: number, obj: any) => {
	const { data } = await axios.post(
		`${config.smsUrl}/settings/top-wallet`,
		obj,
		{
			headers: { ...authHeader(token), UserId: id },
		}
	);
	return data.data;
};

const allWallets = async (token: string, id: number) => {
	const { data } = await axios.get(
		`${config.smsUrl}/wallet/all-org-wallets`,
		{
			headers: { ...authHeader(token), UserId: id },
		}
	);
	return data.data;
};

const topSmsWallets = async (token: string, id: number, obj: any) => {
	const { data } = await axios.post(
		`${config.smsUrl}/wallet/top-org-wallets`,
		obj,
		{
			headers: { ...authHeader(token), UserId: id },
		}
	);
	return data.data;
};

const allTransactions = async (
	token: string,
	id: number,
	startDate: any,
	endDate: any,
	channel: any,
	limit: number,
	page: number
) => {
	const { data } = await axios.get(
		`${config.smsUrl}/wallet/all-transactions?startDate=${startDate}&endDate=${endDate}&channel=${channel}&limit=${limit}&page=${page}`,
		{
			headers: { ...authHeader(token), UserId: id },
		}
	);
	return data.data;
};

const getHistory = async (
	token: string,
	id: number,
	startDate: any,
	endDate: any,
	limit: number,
	page: number
) => {
	const { data } = await axios.get(
		`${config.smsUrl}/sms/all-sms-history?startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${page}`,
		{
			headers: { ...authHeader(token), UserId: id },
		}
	);
	return data.data;
};

const getHistoryReport = async (
	token: string,
	id: number,
	startDate: any,
	endDate: any
) => {
	const { data } = await axios.get(
		`${config.smsUrl}/sms/sms-report?startDate=${startDate}&endDate=${endDate}`,
		{
			headers: { ...authHeader(token), UserId: id },
		}
	);
	return data.data;
};

const verifyTransaction = async (token: string, id: number, obj: any) => {
	const { data } = await axios.post(
		`${config.smsUrl}/wallet/verify-payment`,
		obj,
		{
			headers: { ...authHeader(token), UserId: id },
		}
	);
	return data.data;
};

const smsGraph = async (
	token: string,
	id: number,
	startDate: any,
	endDate: any
) => {
	const { data } = await axios.get(
		`${config.smsUrl}/sms/sms-graph?startDate=${startDate}&endDate=${endDate}`,
		{
			headers: { ...authHeader(token), UserId: id },
		}
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
};

export default smsService;
