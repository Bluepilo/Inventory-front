import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getTransfers = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/transfer/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getTransferDetails = async (token: string, id: string) => {
	const { data } = await axios.get(`${config.baseUrl}/transfer/view/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const approveOrReject = async (token: string, id: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/transfer/${id}/approve-or-reject`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const createTransfer = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/transfer/create`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const transferService = {
	getTransfers,
	getTransferDetails,
	approveOrReject,
	createTransfer,
};

export default transferService;
