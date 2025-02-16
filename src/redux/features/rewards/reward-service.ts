import { apiRequest } from "../../../utils/axiosInstance";

const getWallet = async () => {
	const { data } = await apiRequest("baseUrl").get(`/reward`);
	return data?.data;
};

const getLogs = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/reward/logs${filters}`);
	return data?.data;
};

const claimReward = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/reward/claim`, obj);
	return data?.data;
};

const getAdminRewards = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/admin/reward${filters}`);
	return data?.data || data;
};

const resolveClaimReward = async (id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/reward/${id}/resolve-claim`,
		obj
	);
	return data?.data || data;
};

const resolveEarnedReward = async (id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/admin/reward/${id}/resolve`,
		obj
	);
	return data?.data || data;
};

const acceptTerms = async () => {
	const { data } = await apiRequest("baseUrl").post(
		`/reward/accept-terms`,
		{}
	);
	return data?.data;
};

const referredList = async () => {
	const { data } = await apiRequest("baseUrl").get(`/reward/referred`);
	return data?.data;
};

const referredListAdmin = async (userId: number) => {
	const { data } = await apiRequest("baseUrl").get(
		`/admin/reward/${userId}/referred`
	);
	return data?.data;
};

const rewardService = {
	getWallet,
	getLogs,
	claimReward,
	getAdminRewards,
	resolveClaimReward,
	acceptTerms,
	referredList,
	referredListAdmin,
	resolveEarnedReward,
};

export default rewardService;
