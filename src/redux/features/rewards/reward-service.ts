import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getWallet = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/reward`, {
		headers: authHeader(token),
	});
	return data?.data;
};

const getLogs = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/reward/logs${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data?.data;
};

const claimReward = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/reward/claim`, obj, {
		headers: authHeader(token),
	});
	return data?.data;
};

const getAdminRewards = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/admin/reward${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data?.data || data;
};

const resolveClaimReward = async (token: string, id: string) => {
	const { data } = await axios.post(
		`${config.baseUrl}/admin/reward/${id}/resolve-claim`,
		{},
		{
			headers: authHeader(token),
		}
	);
	return data?.data || data;
};

const rewardService = {
	getWallet,
	getLogs,
	claimReward,
	getAdminRewards,
	resolveClaimReward,
};

export default rewardService;
