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
		`${config.baseUrl}//product/all${filters}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const productService = {
	getProductsInShop,
	allProducts,
};

export default productService;
