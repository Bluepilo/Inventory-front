import { apiRequest } from "../../../utils/axiosInstance";

const getSubHistory = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/subscription/history${filters}`
	);
	return data.data;
};

const getPaymentHistory = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/payment/history${filters}`
	);
	return data.data;
};

const getPlans = async (trial?: boolean) => {
	const { data } = await apiRequest("baseUrl").get(
		`/other/subscription-plans?includeTrial=${trial ? "true" : ""}`
	);
	return data.data;
};

const makeSubscription = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/subscription/subscribe`,
		obj
	);
	return data.data;
};

const makePayment = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/payment/init-load-wallet`,
		obj
	);
	return data.data;
};

const verifyPayment = async (ref: string) => {
	const { data } = await apiRequest("baseUrl").get(`/payment/verify/${ref}`);
	return data.data;
};

const getApplicableDiscount = async (amount: number) => {
	const { data } = await apiRequest("baseUrl").get(
		`/subscription/applicable-discounts?amount=${amount}`
	);
	return data.data;
};

const subscriptionService = {
	getSubHistory,
	getPaymentHistory,
	getPlans,
	makeSubscription,
	makePayment,
	verifyPayment,
	getApplicableDiscount,
};

export default subscriptionService;
