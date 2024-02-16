import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getSales = async (token: string, filters: string) => {
	const { data } = await axios.get(`${config.baseUrl}/sale/all${filters}`, {
		headers: authHeader(token),
	});
	return data.data;
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

const salesService = {
	getSales,
	getSalesSummary,
	searchSales,
};

export default salesService;
