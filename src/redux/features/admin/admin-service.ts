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
		`${config.baseUrl}/admin/organization-list${filter}`,
		{ headers: authHeader(token) }
	);
	return data.data;
};

const listDeletedOrganization = async (filter: string, token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/admin/deleted-organization-history`,
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
		`${config.baseUrl}/brand/approve-or-reject-brand-request/${id}`,
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
		`${config.baseUrl}/admin/topup-organization/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const subscribeOrg = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/subscribe-organization/${id}`,
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
};

export default adminService;
