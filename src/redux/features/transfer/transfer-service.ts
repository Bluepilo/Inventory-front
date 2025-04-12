import { apiRequest } from "../../../utils/axiosInstance";

const getTransfers = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/transfer/all${filters}`);
	return data.data;
};

const getTransferDetails = async (id: string) => {
	const { data } = await apiRequest("baseUrl").get(`/transfer/view/${id}`);
	return data.data;
};

const approveOrReject = async (id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/transfer/${id}/approve-or-reject`,
		obj
	);
	return data.data;
};

const createTransfer = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/transfer/create`, obj);
	return data.data;
};

const transferService = {
	getTransfers,
	getTransferDetails,
	approveOrReject,
	createTransfer,
};

export default transferService;
