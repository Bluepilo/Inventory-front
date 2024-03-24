import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getSubHistory = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/subscription/history${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getPaymentHistory = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/payment/history${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getPlans = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/subscription/plans`, {
		headers: authHeader(token),
	});
	return data.data;
};

const makeSubscription = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/subscription/subscribe`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const makePayment = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/payment/init-load-wallet`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const subscriptionService = {
	getSubHistory,
	getPaymentHistory,
	getPlans,
	makeSubscription,
	makePayment,
};

export default subscriptionService;
