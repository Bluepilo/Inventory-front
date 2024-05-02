import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const dashboardStats = async (filter: string, token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/report/admin-dashboard-report${filter}`,
		{ headers: authHeader(token) }
	);
	return data;
};

const listOrganization = async (filter: string, token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/organization/all${filter}`,
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

const adminService = {
	dashboardStats,
	listOrganization,
	getOrg,
	fetchRequests,
	actionBrandRequests,
};

export default adminService;
