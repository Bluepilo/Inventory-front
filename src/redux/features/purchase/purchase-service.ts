import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getPurchase = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/purchase/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getPurchaseSummary = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/purchase/summary${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const searchPurchase = async (token: string, word: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/purchase/search?search=${word}${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const makePurchase = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/purchase/create`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getPurchaseInfo = async (token: string, id: any) => {
	const { data } = await axios.get(`${config.baseUrl}/purchase/view/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const updateSupply = async (token: string, id: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/purchase/update-items/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const approveOrDeclineWithdrawal = async (
	token: string,
	obj: any,
	ref: string
) => {
	const { data } = await axios.post(
		`${config.baseUrl}/purchase/approve-or-decline-withdrawal/${ref}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const withdrawPurchase = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/purchase/withdraw/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
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
