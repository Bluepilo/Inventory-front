import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getSales = async (token: string, filters: string) => {
	const { data } = await axios.get(`${config.baseUrl}/sale/all${filters}`, {
		headers: authHeader(token),
	});
	return data?.data || data;
};

const getSalesSummary = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/sale/summary${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const searchSales = async (token: string, word: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/sale/search?search=${word}${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const makeSale = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/sale/make-sale`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const getSaleInfo = async (token: string, id: any) => {
	const { data } = await axios.get(`${config.baseUrl}/sale/view/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const withdrawSale = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/sale/withdraw/${id}`,
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
		`${config.baseUrl}/sale/approve-or-decline-withdrawal/${ref}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getTransactions = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/report/payment-report${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data?.data || data;
};

const verifyTransactions = async (token: string, id: number) => {
	const { data } = await axios.post(
		`${config.baseUrl}/transaction/verify/${id}`,
		{},
		{
			headers: authHeader(token),
		}
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
};

export default salesService;
