import { apiRequest } from "../../../utils/axiosInstance";

const getPurchase = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/purchase/all${filters}`);
	return data?.data || data;
};

const getPurchaseSummary = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/purchase/summary${filters}`
	);
	return data.data;
};

const searchPurchase = async (word: string, filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/purchase/search?search=${word}${filters}`
	);
	return data.data;
};

const makePurchase = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/purchase/create`, obj);
	return data.data;
};

const getPurchaseInfo = async (id: any) => {
	const { data } = await apiRequest("baseUrl").get(`/purchase/view/${id}`);
	return data.data;
};

const updateSupply = async (id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/purchase/update-items/${id}`,
		obj
	);
	return data.data;
};

const approveOrDeclineWithdrawal = async (obj: any, ref: string) => {
	const { data } = await apiRequest("baseUrl").post(
		`/purchase/approve-or-decline-withdrawal/${ref}`,
		obj
	);
	return data.data;
};

const withdrawPurchase = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/purchase/withdraw/${id}`,
		obj
	);
	return data.data;
};

const purchaseService = {
	getPurchase,
	getPurchaseSummary,
	searchPurchase,
	makePurchase,
	getPurchaseInfo,
	updateSupply,
	approveOrDeclineWithdrawal,
	withdrawPurchase,
};

export default purchaseService;
