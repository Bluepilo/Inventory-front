import { apiRequest } from "../../../utils/axiosInstance";

const getWalkIns = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/customer/all${filters}`);
	return data?.data || data;
};

const searchWalkIns = async (filters: string, searchWord: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/customer/search${filters}&search=${searchWord}`
	);
	return data.data;
};

const walkInSummary = async (searchWord: string) => {
	let url;
	if (searchWord) {
		url = `customer/summary/search?search=${searchWord}`;
	} else {
		url = `customer/summary`;
	}
	const { data } = await apiRequest("baseUrl").get(`/${url}`);
	return data.data;
};

const getSubdealers = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/subdealer/all${filters}`
	);
	return data?.data || data;
};

const searchSubdealers = async (filters: string, searchWord: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/subdealer/search${filters}&search=${searchWord}`
	);
	return data.data;
};

const subdealerSummary = async (searchWord: string) => {
	let url;
	if (searchWord) {
		url = `subdealer/summary/search?search=${searchWord}`;
	} else {
		url = `subdealer/summary`;
	}
	const { data } = await apiRequest("baseUrl").get(`/${url}`);
	return data.data;
};

const userDetails = async (type: string, id: any) => {
	const { data } = await apiRequest("baseUrl").get(`/${type}/view/${id}`);
	return data.data;
};

const userTransactions = async (type: string, id: any, filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/${type}/transactions/${id}${filters}`
	);
	return data.data;
};

const loadWallet = async (type: string, id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/${type}/deposit-money/${id}`,
		obj
	);
	return data.data;
};

const withdrawWallet = async (type: string, id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/${type}/withdraw-money/${id}`,
		obj
	);
	return data.data;
};

const actionUser = async (type: string, id: any, action: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/${type}/${action}/${id}`,
		obj
	);
	return data.data;
};

const createSupplier = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/supplier/create`, obj);
	return data.data;
};

const editSupplier = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").patch(
		`/supplier/update/${id}`,
		obj
	);
	return data.data;
};

const deleteUser = async (id: any, user: string) => {
	const { data } = await apiRequest("baseUrl").delete(
		`/${user}/delete/${id}`
	);
	return data.data;
};

const searchSuppliers = async (filters: string, searchWord: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/supplier/search${filters}&search=${searchWord}`
	);
	return data.data;
};

const supplierSummary = async (searchWord: string) => {
	let url;
	if (searchWord) {
		url = `supplier/summary/search?search=${searchWord}`;
	} else {
		url = `supplier/summary`;
	}
	const { data } = await apiRequest("baseUrl").get(`/${url}`);
	return data.data;
};

const getSuppliers = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/supplier/all${filters}`);
	return data.data;
};

const listUsers = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/user/all${filters}`);
	return data.data;
};

const createUser = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/user/add`, obj);
	return data.data;
};

const updateUser = async (obj: any, id: any) => {
	const { data } = await apiRequest("baseUrl").put(`/user/update/${id}`, obj);
	return data.data;
};

const listRoles = async () => {
	const { data } = await apiRequest("baseUrl").get(`/other/roles`);
	return data.data;
};

const addUserToBusiness = async (bizId: any, userId: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").patch(
		`/business/${bizId}/add-user/${userId}`,
		obj
	);
	return data.data;
};

const removeUserFromBusiness = async (bizId: any, userId: string) => {
	const { data } = await apiRequest("baseUrl").patch(
		`/business/${bizId}/remove-user/${userId}`,
		{}
	);
	return data.data;
};

const changePassword = async (obj: any, userId: string) => {
	const { data } = await apiRequest("baseUrl").post(
		`/user/change-password/${userId}`,
		obj
	);
	return data.data;
};

const updateUserRole = async (obj: any, userId: string, bizId: string) => {
	const { data } = await apiRequest("baseUrl").patch(
		`/business/${bizId}/update/${userId}`,
		obj
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
