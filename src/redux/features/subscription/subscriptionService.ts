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

const addCard = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/card`, obj);
	return data.data;
};

const getCards = async () => {
	const { data } = await apiRequest("baseUrl").get(`/card`);
	return data.data;
};

const setDefaultCard = async (id: number) => {
	const { data } = await apiRequest("baseUrl").post(
		`/card/${id}/set-default`,
		{}
	);
	return data.data;
};

const deleteCard = async (id: number) => {
	const { data } = await apiRequest("baseUrl").delete(`/card/${id}`);
	return data.data;
};

const useDefaultCard = async (amount: number) => {
	const { data } = await apiRequest("baseUrl").post(
		`/payment/pay-from-default-card`,
		{ amount }
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
	addCard,
	getCards,
	setDefaultCard,
	deleteCard,
	useDefaultCard,
};

export default subscriptionService;
