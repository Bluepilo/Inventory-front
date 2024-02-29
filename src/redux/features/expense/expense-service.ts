import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getExpenses = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/expense/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getRecurrentExpenses = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/expense/recurrent/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const expenseService = {
	getExpenses,
	getRecurrentExpenses,
};

export default expenseService;
