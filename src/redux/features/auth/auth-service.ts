import axios from "axios";

import config from "../../../utils/config";
import { headers } from "../../../utils/headers";

const login = async (data: any) => {
	const response = await axios.post(`${config.baseUrl}/login`, data, {
		headers,
	});
	if (response.data) {
		return response.data;
	}
};

const authService = {
	login,
};

export default authService;
