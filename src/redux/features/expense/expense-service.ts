import { apiRequest } from "../../../utils/axiosInstance";

const getExpenses = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/expense/all${filters}`);
	return data?.data || data;
};

const getRecurrentExpenses = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/expense/recurrent/all${filters}`
	);
	return data.data;
};

const deleteExpense = async (id: string) => {
	const { data } = await apiRequest("baseUrl").delete(
		`/expense/${id}/delete`
	);
	return data.data;
};

const actionOnExpense = async (id: string, action: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/expense/${id}/${action}`,
		obj
	);
	return data.data;
};

const createExpense = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/expense/add`, obj);
	return data.data;
};

const deleteRecurrentExpense = async (id: string) => {
	const { data } = await apiRequest("baseUrl").delete(
		`/expense/recurrent/${id}/delete`
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
