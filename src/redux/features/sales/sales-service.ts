import { apiRequest } from "../../../utils/axiosInstance";

const getSales = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/sale/all${filters}`);
	return data?.data || data;
};

const getSalesSummary = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/sale/summary${filters}`);
	return data.data;
};

const searchSales = async (word: string, filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/sale/search${filters}&search=${word}`
	);
	return data.data;
};

const makeSale = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/sale/make-sale`, obj);
	return data.data;
};

const getSaleInfo = async (id: any) => {
	const { data } = await apiRequest("baseUrl").get(`/sale/view/${id}`);
	return data.data;
};

const withdrawSale = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/sale/withdraw/${id}`,
		obj
	);
	return data.data;
};

const approveOrDeclineWithdrawal = async (obj: any, ref: string) => {
	const { data } = await apiRequest("baseUrl").post(
		`/sale/approve-or-decline-withdrawal/${ref}`,
		obj
	);
	return data.data;
};

const getTransactions = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/report/payment-report${filters}`
	);
	return data?.data || data;
};

const verifyTransactions = async (id: number) => {
	const { data } = await apiRequest("baseUrl").post(
		`/transaction/verify/${id}`,
		{}
	);
	return data.data;
};

const resolveSales = async (id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/sale/resolve/${id}`,
		obj
	);
	return data.data;
};

const salesService = {
	getSales,
	getSalesSummary,
	searchSales,
	makeSale,
	getSaleInfo,
	withdrawSale,
	approveOrDeclineWithdrawal,
	getTransactions,
	verifyTransactions,
	resolveSales,
};

export default salesService;
