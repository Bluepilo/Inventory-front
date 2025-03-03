import { apiRequest } from "../../../utils/axiosInstance";

const getProductsInShop = async (id: any, pOnly?: boolean) => {
	const { data } = await apiRequest("baseUrl").get(
		`/product/all/shop/${id}?all=true&type=${pOnly ? "product_only" : ""}`
	);
	return data.data;
};

const allProducts = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/product/all${filters}`);
	return data.data;
};

const allBrands = async () => {
	const { data } = await apiRequest("baseUrl").get(`/brand/all`);
	return data.data;
};

const filterBrands = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/brand/all${filters}`);
	return data.data;
};

const managedBrands = async () => {
	const { data } = await apiRequest("baseUrl").get(`/brand/managed/all`);
	return data.data;
};

const deleteBrand = async (id: string) => {
	const { data } = await apiRequest("baseUrl").delete(`/brand/delete/${id}`);
	return data.data;
};

const updateManaged = async (url: string, id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/brand/${url}/${id}`,
		obj
	);
	return data.data;
};

const editBrand = async (id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/brand/update/${id}`,
		obj
	);
	return data.data;
};

const createBrand = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/brand/create`, obj);
	return data.data;
};

const requestBrand = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/brand/request-brand`,
		obj
	);
	return data.data;
};

const productCategories = async () => {
	const { data } = await apiRequest("baseUrl").get(`/product/categories`);
	return data.data;
};

const createProduct = async (obj: any, isAdmin: boolean) => {
	let url = isAdmin ? `/admin/product` : `/product/create`;
	const { data } = await apiRequest("baseUrl").post(url, obj);
	return data.data;
};

const editProduct = async (obj: any, id: string, isAdmin: boolean) => {
	if (isAdmin) {
		const { data } = await apiRequest("baseUrl").post(
			`/admin/product/${id}`,
			obj
		);
		return data.data;
	} else {
		const { data } = await apiRequest("baseUrl").put(
			`/product/update/${id}`,
			obj
		);
		return data.data;
	}
};

const viewBrand = async (id: string) => {
	const { data } = await apiRequest("baseUrl").get(`/brand/view/${id}`);
	return data.data;
};

const listBrandProducts = async (filters: string, id: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/product/all?brandId=${id}${filters}`
	);
	return data.data;
};

const searchProducts = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/product/search${filters}`
	);
	return data.data;
};

const deleteProduct = async (id: string, isAdmin: boolean) => {
	let url = isAdmin ? `/admin/product/${id}` : `/product/delete/${id}`;
	const { data } = await apiRequest("baseUrl").delete(url);
	return data.data;
};

const deleteBulkProduct = async (ids: any, isAdmin: boolean) => {
	let url = isAdmin ? `/admin/product/bulk-delete` : `/product/bulk-delete`;
	const { data } = await apiRequest("baseUrl").post(url, { ids });
	return data.data;
};

const removeServices = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/shop/${id}/remove-services`,
		obj
	);
	return data.data;
};

const addServices = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/shop/${id}/add-services`,
		obj
	);
	return data.data;
};

const stockReports = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/report/stock-report${filters}`
	);
	return data?.data || data;
};

const setMinStockAlert = async (id: string, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/product/set-min-stock/${id}`,
		obj
	);
	return data.data;
};

const getLogTypes = async () => {
	const { data } = await apiRequest("baseUrl").get(
		`/other/product-log-types`
	);
	return data.data;
};

const getLogReports = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(
		`/report/product-report${filters}`
	);
	return data?.data || data;
};

const getProductReturns = async (filters: string) => {
	const { data } = await apiRequest("baseUrl").get(`/return/all${filters}`);
	return data.data;
};

const returnProduct = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(`/return/create`, obj);
	return data.data;
};

const logDetails = async (id: any) => {
	const { data } = await apiRequest("baseUrl").get(`/return/view/${id}`);
	return data.data;
};

const resolveReturn = async (id: any, obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/return/resolve/${id}`,
		obj
	);
	return data.data;
};

const adjustStock = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/product/adjust-stock`,
		obj
	);
	return data.data;
};

const addProductCategory = async (obj: any) => {
	const { data } = await apiRequest("baseUrl").post(
		`/product/add-category`,
		obj
	);
	return data.data;
};

const editProductCategory = async (obj: any, id: number) => {
	const { data } = await apiRequest("baseUrl").put(
		`/admin/product/category/${id}`,
		obj
	);
	return data.data;
};

const deleteProductCategory = async (id: number) => {
	const { data } = await apiRequest("baseUrl").delete(
		`/product/delete-category/${id}`
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
	deleteBulkProduct,
	editProductCategory,
};

export default productService;
