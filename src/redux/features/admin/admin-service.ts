import axios from "axios";
import config from "../../../utils/config";
import { authHeader, headers } from "../../../utils/headers";

const dashboardStats = async (filter: string, token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/admin/dashboard${filter}`,
		{ headers: authHeader(token) }
	);
	return data;
};

const listOrganization = async (filter: string, token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/admin/organization${filter}`,
		{ headers: authHeader(token) }
	);
	return data.data;
};

const listDeletedOrganization = async (filter: string, token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/admin/organization/deleted`,
		{ headers: authHeader(token) }
	);
	return data.data;
};

const getOrg = async (token: string, id: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/organization/view/${id}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const fetchRequests = async (token: string, status: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/brand/brand-requests${status}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const actionBrandRequests = async (token: string, id: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/brand/request/${id}/action`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const listTransactions = async (filter: string, token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/admin/payment-history${filter}`,
		{ headers: authHeader(token) }
	);
	return data.data;
};

const createFaq = async (obj: any, token: string) => {
	const { data } = await axios.post(`${config.baseUrl}/admin/faq`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const updateFaq = async (obj: any, token: string, id: string) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/faq/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const deleteFaq = async (token: string, id: string) => {
	const { data } = await axios.delete(`${config.baseUrl}/admin/faq/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const getTerms = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/settings/get-terms`, {
		headers: authHeader(token),
	});
	return data.data;
};

const setTerms = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/settings/set-terms`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const subTracker = async (token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/admin/subscription-statistics`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const topWallet = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/organization/${id}/topup`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const subscribeOrg = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/organization/${id}/subscribe`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const deleteOrg = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/delete-organization/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getPlans = async (token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/other/subscription-plans`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const allCarousels = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/admin/carousel`, {
		headers: authHeader(token),
	});
	return data.data;
};

const createCarousel = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/admin/carousel`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const editCarousel = async (token: string, id: number, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/carousel/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const deleteCarousel = async (token: string, id: number) => {
	const { data } = await axios.delete(
		`${config.baseUrl}/admin/carousel/${id}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const actionOrganization = async (
	token: string,
	id: number,
	action: string
) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/organization/${id}/${action}`,
		{},
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const loadFaqs = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/admin/faq`, {
		headers: authHeader(token),
	});
	return data.data;
};

const extendTrial = async (token: string, id: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/organization/${id}/extend-trial`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const listRoles = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/admin/role`, {
		headers: authHeader(token),
	});
	return data.data;
};

const createRole = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/admin/role`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const deleteRole = async (token: string, id: number) => {
	const { data } = await axios.delete(`${config.baseUrl}/admin/role/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
};
const listPermissions = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/admin/permissions`, {
		headers: authHeader(token),
	});
	return data.data;
};

const listRolePermissions = async (token: string, id: any) => {
	const { data } = await axios.get(`${config.baseUrl}/admin/role/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const assignPermissions = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/role/${id}/assign-permission`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const removePermissions = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/role/${id}/remove-permission`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const listUsers = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/admin/user`, {
		headers: authHeader(token),
	});
	return data.data;
};

const actionUsers = async (token: string, id: number, action: string) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/user/${id}/${action}`,
		{},
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const deleteUser = async (token: string, id: number) => {
	const { data } = await axios.delete(`${config.baseUrl}/admin/user/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const createUser = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/admin/user`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const assignRole = async (token: string, userId: number, roleId: string) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/role/${roleId}/user/${userId}/assign`,
		{},
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const listProducts = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/admin/product${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const appSettings = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/admin/settings`, {
		headers: authHeader(token),
	});
	return data.data;
};

const updateAppSettings = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/admin/settings`, obj, {
		headers: authHeader(token),
	});
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
};

export default adminService;
