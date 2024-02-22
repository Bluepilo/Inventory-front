import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getWalkIns = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/customer/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const searchWalkIns = async (
	token: string,
	filters: string,
	searchWord: string
) => {
	const { data } = await axios.get(
		`${config.baseUrl}/customer/search${filters}&search=${searchWord}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const walkInSummary = async (token: string, searchWord: string) => {
	let url;
	if (searchWord) {
		url = `customer/summary/search?search=${searchWord}`;
	} else {
		url = `customer/summary`;
	}
	const { data } = await axios.get(`${config.baseUrl}/${url}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const getSubdealers = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/subdealer/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const searchSubdealers = async (
	token: string,
	filters: string,
	searchWord: string
) => {
	const { data } = await axios.get(
		`${config.baseUrl}/subdealer/search${filters}&search=${searchWord}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const subdealerSummary = async (token: string, searchWord: string) => {
	let url;
	if (searchWord) {
		url = `subdealer/summary/search?search=${searchWord}`;
	} else {
		url = `subdealer/summary`;
	}
	const { data } = await axios.get(`${config.baseUrl}/${url}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const customerService = {
	getWalkIns,
	searchWalkIns,
	walkInSummary,
	getSubdealers,
	searchSubdealers,
	subdealerSummary,
};

export default customerService;
