import axios from "axios";
import config from "../../../utils/config";
import { authHeader } from "../../../utils/headers";

const getProductsInShop = async (token: string, id: any, pOnly?: boolean) => {
	const { data } = await axios.get(
		`${config.baseUrl}/product/all/shop/${id}?all=true&type=${
			pOnly ? "product_only" : ""
		}`,
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

const filterBrands = async (token: string, filters: string) => {
	const { data } = await axios.get(`${config.baseUrl}/brand/all${filters}`, {
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

const productCategories = async (token: string) => {
	const { data } = await axios.get(`${config.baseUrl}/product/categories`, {
		headers: authHeader(token),
	});
	return data.data;
};

const createProduct = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/product/create`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const editProduct = async (token: string, obj: any, id: string) => {
	const { data } = await axios.put(
		`${config.baseUrl}/product/update/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const viewBrand = async (token: string, id: string) => {
	const { data } = await axios.get(`${config.baseUrl}/brand/view/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const listBrandProducts = async (
	token: string,
	filters: string,
	id: string
) => {
	const { data } = await axios.get(
		`${config.baseUrl}/product/all?brandId=${id}${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const searchProducts = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/product/search${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const deleteProduct = async (token: string, id: string) => {
	const { data } = await axios.delete(
		`${config.baseUrl}/product/delete/${id}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const removeServices = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/shop/${id}/remove-services`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const addServices = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/shop/${id}/add-services`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const stockReports = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/report/stock-report${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data?.data || data;
};

const setMinStockAlert = async (token: string, id: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/product/set-min-stock/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getLogTypes = async (token: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/other/product-log-types`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getLogReports = async (token: string, filters: string) => {
	const { data } = await axios.get(
		`${config.baseUrl}/report/product-report${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data?.data || data;
};

const getProductReturns = async (token: string, filters: string) => {
	const { data } = await axios.get(`${config.baseUrl}/return/all${filters}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const returnProduct = async (token: string, obj: any) => {
	const { data } = await axios.post(`${config.baseUrl}/return/create`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const logDetails = async (token: string, id: any) => {
	const { data } = await axios.get(`${config.baseUrl}/return/view/${id}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const resolveReturn = async (token: string, id: any, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/return/resolve/${id}`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const adjustStock = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/product/adjust-stock`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const addProductCategory = async (token: string, obj: any) => {
	const { data } = await axios.post(
		`${config.baseUrl}/product/add-category`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const deleteProductCategory = async (token: string, id: number) => {
	const { data } = await axios.delete(
		`${config.baseUrl}/product/delete-category/${id}`,
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
	productCategories,
	createProduct,
	editProduct,
	listBrandProducts,
	viewBrand,
	searchProducts,
	deleteProduct,
	removeServices,
	addServices,
	filterBrands,
	stockReports,
	setMinStockAlert,
	getLogTypes,
	getLogReports,
	getProductReturns,
	returnProduct,
	logDetails,
	resolveReturn,
	adjustStock,
	addProductCategory,
	deleteProductCategory,
};

export default productService;
