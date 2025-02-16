import axios from "axios";
import config from "./config";

const apiRequest = (service: "baseUrl" | "smsUrl", id?: string | number) => {
	const axiosInstance = axios.create({
		baseURL: `${config[service]}`,
	});

	axiosInstance.interceptors.request.use(
		async (config) => {
			const accessToken = localStorage.getItem("@savedtoken");
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			if (id) {
				config.headers.UserId = id;
			}
			config.headers["Content-Type"] = "application/json";
			config.headers["Accept"] = "application/json";
			return config;
		},
		(error) => Promise.reject(error)
	);
	return axiosInstance;
};

export { apiRequest };
