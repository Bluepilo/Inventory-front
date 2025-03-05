import { apiRequest } from "../../../utils/axiosInstance";

const dashboardStats = async (filter: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/admin/dashboard${filter}`
	);
	return data;
};

const listOrganization = async (filter: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/admin/organization${filter}`
	);
	return data.data;
};

const listDeletedOrganization = async () => {
	const { data } = await apiRequest("baseUrl").get(
		`/admin/organization/deleted`
	);
	return data.data;
};

const getOrg = async (id: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/organization/view/${id}`
	);
	return data.data;
};

const fetchRequests = async (status: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/brand/brand-requests${status}`
	);
	return data.data;
};

const actionBrandRequests = async (id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/brand/request/${id}/action`,
		obj
	);
	return data.data;
};

const listTransactions = async (filter: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/admin/payment-history${filter}`
	);
	return data.data;
};

const createFaq = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/admin/faq`, obj);
	return data.data;
};

const updateFaq = async (obj: any, id: string) => {
	const { data } = await apiRequest("baseUrl").post(`/admin/faq/${id}`, obj);
	return data.data;
};

const deleteFaq = async (id: string) => {
	const { data } = await apiRequest("baseUrl").delete(`/admin/faq/${id}`);
	return data.data;
};

const getTerms = async () => {
	const { data } = await apiRequest("baseUrl").get(`/settings/get-terms`);
	return data.data;
};

const setTerms = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/settings/set-terms`,
		obj
	);
	return data.data;
};

const subTracker = async () => {
	const { data } = await apiRequest("baseUrl").get(
		`/admin/subscription-statistics`
	);
	return data.data;
};

const topWallet = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/organization/${id}/topup`,
		obj
	);
	return data.data;
};

const subscribeOrg = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/organization/${id}/subscribe`,
		obj
	);
	return data.data;
};

const deleteOrg = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/organization/${id}/delete`,
		obj
	);
	return data.data;
};

const getPlans = async () => {
	const { data } = await apiRequest("baseUrl").get(
		`/other/subscription-plans`
	);
	return data.data;
};

const allCarousels = async () => {
	const { data } = await apiRequest("baseUrl").get(`/admin/carousel`);
	return data.data;
};

const createCarousel = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/admin/carousel`, obj);
	return data.data;
};

const editCarousel = async (id: number, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/carousel/${id}`,
		obj
	);
	return data.data;
};

const deleteCarousel = async (id: number) => {
	const { data } = await apiRequest("baseUrl").delete(
		`/admin/carousel/${id}`
	);
	return data.data;
};

const actionOrganization = async (id: number, action: string) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/organization/${id}/${action}`,
		{}
	);
	return data.data;
};

const loadFaqs = async () => {
	const { data } = await apiRequest("baseUrl").get(`/admin/faq`);
	return data.data;
};

const extendTrial = async (id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/organization/${id}/extend-trial`,
		obj
	);
	return data.data;
};

const listRoles = async () => {
	const { data } = await apiRequest("baseUrl").get(`/admin/role`);
	return data.data;
};

const createRole = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/admin/role`, obj);
	return data.data;
};

const deleteRole = async (id: number) => {
	const { data } = await apiRequest("baseUrl").delete(`/admin/role/${id}`);
	return data.data;
};
const listPermissions = async () => {
	const { data } = await apiRequest("baseUrl").get(`/admin/permissions`);
	return data.data;
};

const listRolePermissions = async (id: any) => {
	const { data } = await apiRequest("baseUrl").get(`/admin/role/${id}`);
	return data.data;
};

const assignPermissions = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/role/${id}/assign-permission`,
		obj
	);
	return data.data;
};

const removePermissions = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/role/${id}/remove-permission`,
		obj
	);
	return data.data;
};

const listUsers = async () => {
	const { data } = await apiRequest("baseUrl").get(`/admin/user`);
	return data.data;
};

const actionUsers = async (id: number, action: string) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/user/${id}/${action}`,
		{}
	);
	return data.data;
};

const deleteUser = async (id: number) => {
	const { data } = await apiRequest("baseUrl").delete(`/admin/user/${id}`);
	return data.data;
};

const createUser = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/admin/user`, obj);
	return data.data;
};

const assignRole = async (userId: number, roleId: string) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/role/${roleId}/user/${userId}/assign`,
		{}
	);
	return data.data;
};

const listProducts = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/admin/product${filters}`
	);
	return data.data;
};

const listProductCategories = async () => {
	const { data } = await apiRequest("baseUrl").get(
		`/admin/product/categories/list`
	);
	return data.data;
};

const appSettings = async () => {
	const { data } = await apiRequest("baseUrl").get(`/admin/settings`);
	return data.data;
};

const updateAppSettings = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/admin/settings`, obj);
	return data.data;
};

const listDiscounts = async () => {
	const { data } = await apiRequest("baseUrl").get(`/admin/discounts`);
	return data.data;
};

const deleteDiscount = async (id: number) => {
	const { data } = await apiRequest("baseUrl").delete(
		`/admin/discount/${id}`
	);
	return data.data;
};

const createDiscount = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/admin/discount`, obj);
	return data.data;
};

const updateDiscount = async (obj: any, id: number) => {
	const { data } = await apiRequest("baseUrl").put(
		`/admin/discount/${id}`,
		obj
	);
	return data.data;
};

const adminService = {
	dashboardStats,
	listOrganization,
	listDeletedOrganization,
	getOrg,
	fetchRequests,
	actionBrandRequests,
	listTransactions,
	createFaq,
	updateFaq,
	deleteFaq,
	getTerms,
	setTerms,
	subTracker,
	topWallet,
	subscribeOrg,
	deleteOrg,
	getPlans,
	allCarousels,
	createCarousel,
	editCarousel,
	deleteCarousel,
	actionOrganization,
	loadFaqs,
	extendTrial,
	listRoles,
	listPermissions,
	listRolePermissions,
	assignPermissions,
	removePermissions,
	createRole,
	deleteRole,
	listUsers,
	actionUsers,
	deleteUser,
	assignRole,
	createUser,
	listProducts,
	appSettings,
	updateAppSettings,
	listProductCategories,
	listDiscounts,
	createDiscount,
	updateDiscount,
	deleteDiscount,
};

export default adminService;
