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
	return data?.data || data;
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

const deleteExpense = async (token: string, id: string) => {
	const { data } = await axios.delete(
		`${config.baseUrl}/expense/${id}/delete`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const actionOnExpense = async (
	token: string,
	id: string,
	action: string,
	obj: any
) => {
	const { data } = await axios.post(
		`${config.baseUrl}/expense/${id}/${action}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const createExpense = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/expense/add`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const deleteRecurrentExpense = async (token: string, id: string) => {
	const { data } = await axios.delete(
		`${config.baseUrl}/expense/recurrent/${id}/delete`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const expenseService = {
	getExpenses,
	getRecurrentExpenses,
	deleteExpense,
	actionOnExpense,
	createExpense,
	deleteRecurrentExpense,
};

export default expenseService;
