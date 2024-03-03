import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getProductsInShop = async (token: string, id: any) => {
	const { data } = await axios.get(
		`${config.baseUrl}/product/all/shop/${id}?all=true`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const allProducts = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/product/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const allBrands = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/brand/all`, {
		headers: authHeader(token),
	});
	return data.data;
};

const managedBrands = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/brand/managed/all`, {
		headers: authHeader(token),
	});
	return data.data;
};

const deleteBrand = async (token: string, id: string) => {
	const { data } = await axios.delete(
		`${config.baseUrl}/brand/delete/${id}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const updateManaged = async (
	token: string,
	url: string,
	id: string,
	obj: any
) => {
	const { data } = await axios.post(
		`${config.baseUrl}/brand/${url}/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const editBrand = async (token: string, id: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/brand/update/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const createBrand = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/brand/create`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const requestBrand = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/brand/request-brand`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const productService = {
	getProductsInShop,
	allProducts,
	allBrands,
	managedBrands,
	deleteBrand,
	updateManaged,
	editBrand,
	createBrand,
	requestBrand,
};

export default productService;
