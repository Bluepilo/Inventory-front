import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getWallet = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/reward`, {
		headers: authHeader(token),
	});
	return data?.data || data;
};

const getLogs = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/reward/logs`, {
		headers: authHeader(token),
	});
	return data?.data || data;
};

const rewardService = {
	getWallet,
	getLogs,
};

export default rewardService;
