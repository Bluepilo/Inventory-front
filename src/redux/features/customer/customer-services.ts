import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getWalkIns = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/customer/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	console.log(data?.data || data, "result");
	return data?.data || data;
};

const searchWalkIns = async (
	token: string,
	filters: string,
	searchWord: string
) => {
	const { data } = await axios.get(
		`${config.baseUrl}/customer/search${filters}&search=${searchWord}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const walkInSummary = async (token: string, searchWord: string) => {
	let url;
	if (searchWord) {
		url = `customer/summary/search?search=${searchWord}`;
	} else {
		url = `customer/summary`;
	}
	const { data } = await axios.get(`${config.baseUrl}/${url}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const getSubdealers = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/subdealer/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data?.data || data;
};

const searchSubdealers = async (
	token: string,
	filters: string,
	searchWord: string
) => {
	const { data } = await axios.get(
		`${config.baseUrl}/subdealer/search${filters}&search=${searchWord}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const subdealerSummary = async (token: string, searchWord: string) => {
	let url;
	if (searchWord) {
		url = `subdealer/summary/search?search=${searchWord}`;
	} else {
		url = `subdealer/summary`;
	}
	const { data } = await axios.get(`${config.baseUrl}/${url}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const userDetails = async (token: string, type: string, id: any) => {
	const { data } = await axios.get(`${config.baseUrl}/${type}/view/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const userTransactions = async (
	token: string,
	type: string,
	id: any,
	filters: string
) => {
	const { data } = await axios.get(
		`${config.baseUrl}/${type}/transactions/${id}${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const loadWallet = async (
	token: string,
	type: string,
	id: string,
	obj: any
) => {
	const { data } = await axios.post(
		`${config.baseUrl}/${type}/deposit-money/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const withdrawWallet = async (
	token: string,
	type: string,
	id: any,
	obj: any
) => {
	const { data } = await axios.post(
		`${config.baseUrl}/${type}/withdraw-money/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const actionUser = async (
	token: string,
	type: string,
	id: any,
	action: string,
	obj: any
) => {
	const { data } = await axios.post(
		`${config.baseUrl}/${type}/${action}/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const createSupplier = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}//supplier/create`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const editSupplier = async (token: string, id: any, obj: any) => {
	const { data } = await axios.patch(
		`${config.baseUrl}/supplier/update/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const deleteUser = async (token: string, id: any, user: string) => {
	const { data } = await axios.delete(
		`${config.baseUrl}/${user}/delete/${id}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const searchSuppliers = async (
	token: string,
	filters: string,
	searchWord: string
) => {
	const { data } = await axios.get(
		`${config.baseUrl}/supplier/search${filters}&search=${searchWord}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const supplierSummary = async (token: string, searchWord: string) => {
	let url;
	if (searchWord) {
		url = `supplier/summary/search?search=${searchWord}`;
	} else {
		url = `supplier/summary`;
	}
	const { data } = await axios.get(`${config.baseUrl}/${url}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const getSuppliers = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/supplier/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const listUsers = async (token: string, filters: string) => {
	const { data } = await axios.get(`${config.baseUrl}/user/all${filters}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const createUser = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/user/add`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const updateUser = async (token: string, obj: any, id: any) => {
	const { data } = await axios.put(
		`${config.baseUrl}/user/update/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const listRoles = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/other/roles`, {
		headers: authHeader(token),
	});
	return data.data;
};

const addUserToBusiness = async (
	token: string,
	bizId: any,
	userId: string,
	obj: any
) => {
	const { data } = await axios.patch(
		`${config.baseUrl}/business/${bizId}/add-user/${userId}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const removeUserFromBusiness = async (
	token: string,
	bizId: any,
	userId: string
) => {
	const { data } = await axios.patch(
		`${config.baseUrl}/business/${bizId}/remove-user/${userId}`,
		{},
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const changePassword = async (token: string, obj: any, userId: string) => {
	const { data } = await axios.post(
		`${config.baseUrl}/user/change-password/${userId}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const updateUserRole = async (
	token: string,
	obj: any,
	userId: string,
	bizId: string
) => {
	const { data } = await axios.patch(
		`${config.baseUrl}/business/${bizId}/update/${userId}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const customerService = {
	getWalkIns,
	searchWalkIns,
	walkInSummary,
	getSubdealers,
	searchSubdealers,
	subdealerSummary,
	userDetails,
	userTransactions,
	loadWallet,
	withdrawWallet,
	actionUser,
	createSupplier,
	editSupplier,
	searchSuppliers,
	supplierSummary,
	getSuppliers,
	listUsers,
	createUser,
	updateUser,
	listRoles,
	addUserToBusiness,
	removeUserFromBusiness,
	changePassword,
	deleteUser,
	updateUserRole,
};

export default customerService;
